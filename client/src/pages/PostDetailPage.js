import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import axios from "axios";
import "react-quill/dist/quill.core.css";

import { useParams, useNavigate } from "react-router-dom";
import { dateChanger } from "../lib/module/dateChanger";
import { useSelector } from "react-redux";

const PostDetailPage = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/posts/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostData(response.data.post);
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      {loading ? (
        <>
          <Post>
            <Title>{postData.title}</Title>
            <PostInfoDiv>
              <PostInfo color={palette.orange}>{postData.category}</PostInfo>
              <PostInfo color={palette.gray}>
                {dateChanger(postData.publishedDate)}
              </PostInfo>
              <PostInfo color='black'>
                작성자 : {postData.author.displayName}
              </PostInfo>
            </PostInfoDiv>

            <div
              className='view ql-editor'
              dangerouslySetInnerHTML={{ __html: postData.content }}
            ></div>
          </Post>
          <hr />
          {user.uid === postData.author.uid && (
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
          )}
        </>
      ) : null}
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

const PostInfo = styled.div`
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
