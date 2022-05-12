import React, { useState, useEffect } from "react";
import { Editor } from "../components/writer/Editor";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WriterPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인한 회원만 글을 작성할 수 있습니다.");
      navigate("/");
    }
  }, []);

  const onClickHandler = async (e) => {
    e.preventDefault();
    if (title === "" || content === "" || category === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: title,
      content: content,
      category: category,
      text: text,
      uid: user.uid,
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
    <Form>
      <TitleInput
        onChange={(e) => setTitle(e.currentTarget.value)}
        value={title}
        placeholder='제목을 입력하세요'
      />
      <CategoryDiv>
        <label htmlFor='category'>카테고리</label>
        <input
          id='category'
          onChange={(e) => setCategory(e.currentTarget.value)}
          value={category}
          placeholder='카테고리를 입력하세요'
        />
      </CategoryDiv>
      <Editor
        content={content}
        setContent={setContent}
        setText={setText}
        style={{ marginBottom: "10px" }}
      />
      <ButtonDiv>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          취소
        </button>
        <button onClick={onClickHandler}>발행</button>
      </ButtonDiv>
    </Form>
  );
};

export default WriterPage;

const Form = styled.form`
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
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
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

const CategoryDiv = styled.div`
  margin-bottom: 20px;
  input {
    border: 1px solid gray;
    margin-left: 10px;
  }
`;
