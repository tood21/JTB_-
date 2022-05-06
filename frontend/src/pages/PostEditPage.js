import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PostEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({});
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const post = async () => {
      try {
        let body = {
          postNum: params.postNum,
        };
        const response = await axios.post("/api/posts/detail", body);
        if (response.data.success) {
          setPostData(response.data.post);
        }
      } catch (e) {
        console.log(e);
      }
    };
    post();
  }, []);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [("bold", "italic", "underline", "strike")], // toggled buttons
          ["blockquote", "code-block"],

          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image"],
          ["clean"], // remove formatting button
        ],
      },
      // handlers: {
      //   image: imageHandler,
      // },
      formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
      ],
    });

    //현재 입력 되어 있는 데이터(글, 그림 등등을 html형식으로 보여줌)
    const quill = quillInstance.current;

    quill.on("text-change", (delta, oldDelta, source) => {
      setContent(quill.root.innerHTML);
    });
  }, []);

  useEffect(() => {
    quillInstance.current.root.innerHTML = postData.content;
  }, [postData]);

  useEffect(() => {
    setTitle(postData.title);
    setContent(postData.content);
    setCategory(postData.category);
  }, [postData]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onClickHandler = async () => {
    if (title === "" || content === "" || category === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: title,
      content: content,
      category: category,
      postNum: params.postNum,
    };

    try {
      const response = await axios.post("/api/posts/edit", body);
      console.log("res", response.data);
      if (response.data.success) {
        alert("글 수정이 성공하였습니다.");
        navigate(`/post/detail/${params.postNum}`);
      } else {
        alert("글 수정이 실패하였습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <TitleInput
        onChange={onChangeTitle}
        placeholder='제목을 입력하세요'
        value={title}
      />
      <EditorWrapper ref={quillElement} />
      <input
        onChange={onChangeCategory}
        placeholder='카테고리를 입력하세요'
        value={category}
      />
      <button onClick={onClickHandler}>발행</button>
    </Wrapper>
  );
};

export default PostEditPage;

const Wrapper = styled.div`
  padding: 100px;
`;

const TitleInput = styled.input`
  width: 100%;
  border-bottom: #ccc 1px solid;
  font-size: 34px;
  margin-bottom: 20px;
  padding: 10px;
`;

const EditorWrapper = styled.div`
  font-family: "NotoSansKr";
  min-height: 400px;
`;
