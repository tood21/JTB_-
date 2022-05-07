import React, { useState } from "react";
import { Editor } from "../components/writer/Editor";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WriterPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

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
      <Editor setContent={setContent} />
      <input onChange={onChangeCategory} placeholder='카테고리를 입력하세요' />
      <button onClick={onClickHandler}>발행</button>
    </Wrapper>
  );
};

export default WriterPage;

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
