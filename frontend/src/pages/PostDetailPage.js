import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import axios from "axios";
import "react-quill/dist/quill.core.css";

import { useParams, useNavigate } from "react-router-dom";
import { dateChanger } from "../lib/module/dateChanger";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [postData]);

  const postDeleteHandler = async () => {
    if (window.confirm("글을 삭제 하시겠습니까?")) {
      try {
        let body = {
          postNum: params.postNum,
        };
        const response = await axios.post("/api/posts/delete", body);
        if (response.data.success) {
          alert("게시글이 삭제 되었습니다.");
          navigate("/");
        }
      } catch (e) {
        console.log(e);
        alert("게시글이 삭제 실패하였습니다.");
      }
    }
  };

  return (
    <Wrapper>
      {loading ? null : (
        <>
          <Post>
            <Title>{postData.title}</Title>
            <PostInfoDiv>
              <PostInfo color={palette.orange}>{postData.category}</PostInfo>
              <PostInfo color={palette.gray}>
                {dateChanger(postData.publishedDate).props.children}
              </PostInfo>
            </PostInfoDiv>

            <div
              className='view ql-editor'
              dangerouslySetInnerHTML={{ __html: postData.content }}
            ></div>
          </Post>
          <hr />
          <ButtonDiv>
            <button
              onClick={() => {
                navigate(`/post/edit/${params.postNum}`);
              }}
            >
              수정
            </button>
            <button onClick={postDeleteHandler}>삭제</button>
          </ButtonDiv>
        </>
      )}
    </Wrapper>
  );
};

export default PostDetailPage;

const Wrapper = styled.div`
  width: 90%;
  margin-top: 100px;
`;

const Post = styled.div`
  width: 100%;
  min-height: 350px;
  background: #ffffff;
`;
const PostInfoDiv = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 34px;
  margin-bottom: 20px;
  width: 100%;
  font-weight: bold;
`;

const PostInfo = styled.p`
  font-size: 13px;
  justify-content: flex-start;
  padding-right: 20px;
  color: ${(props) => props.color};
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
