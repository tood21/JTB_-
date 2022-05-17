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
  const [text, setText] = useState("");

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
    setText(postData.text);
  }, [postData]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

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
    <Form>
      <TitleInput
        onChange={onChangeTitle}
        value={title}
        placeholder='제목을 입력하세요'
      />
      <CategoryDiv>
        <label htmlFor='category'>카테고리</label>
        <input
          id='category'
          onChange={onChangeCategory}
          value={category}
          placeholder='카테고리를 입력하세요'
        />
      </CategoryDiv>
      <Editor content={content} setContent={setContent} setText={setText} />
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

export default PostEditPage;

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
