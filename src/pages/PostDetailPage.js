import React from "react";
import styled from "styled-components";
import data from "../dummyData";
import palette from "../lib/styles/palette";

const PostDetailPage = () => {
  return (
    <Wrapper>
      <Title>{data[0].title}</Title>
      <PostInfoContainer>
        <PostInfo color={palette.orange}>{data[0].category}</PostInfo>
        <PostInfo color={palette.gray}>{data[0].date}</PostInfo>
      </PostInfoContainer>
      <p>{data[0].content}</p>
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
