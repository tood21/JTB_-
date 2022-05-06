import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import axios from "axios";
import { useParams } from "react-router-dom";
import { dateChanger } from "../lib/module/dateChanger";

const PostDetailPage = () => {
  const params = useParams();
  const [postData, setPostData] = useState({});

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
    console.log(postData);
  }, [postData]);

  return (
    <Wrapper>
      <Title>{postData.title}</Title>
      <PostInfoContainer>
        <PostInfo color={palette.orange}>{postData.category}</PostInfo>
        <PostInfo color={palette.gray}>
          {dateChanger(postData.publishedDate)}
        </PostInfo>
      </PostInfoContainer>
      <p dangerouslySetInnerHTML={{ __html: postData.content }}></p>
    </Wrapper>
  );
};

export default PostDetailPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`;

const Title = styled.h2`
  font-size: 34px;
  margin-bottom: 20px;
  width: 100%;
`;

const PostInfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const PostInfo = styled.p`
  font-size: 13px;
  justify-content: flex-start;
  padding-right: 20px;
  color: ${(props) => props.color};
`;
