import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Editor = () => {
  const navigate = useNavigate();
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

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
    console.log(
      quill.on("text-change", (delta, oldDelta, source) => {
        setContent(quill.root.innerHTML);
      })
    );
  }, []);

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
    };

    try {
      const response = await axios.post("/api/posts/write", body);
      console.log("res", response.data);
      if (response.data.success) {
        alert("글 작성이 성공하였습니다.");
        navigate("/");
      } else {
        alert("글 작성이 실패하였습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <TitleInput onChange={onChangeTitle} placeholder='제목을 입력하세요' />
      <EditorWrapper ref={quillElement} />
      <input onChange={onChangeCategory} placeholder='카테고리를 입력하세요' />
      <button onClick={onClickHandler}>발행</button>
    </Wrapper>
  );
};

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
