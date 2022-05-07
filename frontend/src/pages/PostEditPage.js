import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "../components/writer/Editor";

const PostEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({});
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
        value={title}
        placeholder='제목을 입력하세요'
      />
      <Editor postData={postData} setContent={setContent} />
      <input
        onChange={onChangeCategory}
        value={category}
        placeholder='카테고리를 입력하세요'
      />
      <ButtonDiv>
        <button onClick={onClickHandler}>발행</button>
      </ButtonDiv>
    </Wrapper>
  );
};

export default PostEditPage;

const Wrapper = styled.div`
  width: 90%;
  margin-top: 50px;
`;

const TitleInput = styled.input`
  width: 100%;
  border-bottom: #ccc 1px solid;
  font-size: 34px;
  margin-bottom: 20px;
  padding: 10px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  button {
    border: 1px solid black;
    margin-right: 10px;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    padding: 5px 10px;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
