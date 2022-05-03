import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const PostItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate("/postdetail");
      }}
    >
      <Title>
        {data.title.length < 70 ? data.title : data.title.slice(0, 70) + "..."}
      </Title>
      <PostText>
        {data.content.length < 150
          ? data.content
          : data.content.slice(0, 150) + "..."}
      </PostText>
      <PostInfo>
        <Category>{data.category}</Category>
        <p>{data.date}</p>
      </PostInfo>
    </Container>
  );
};

export default PostItem;

const Container = styled.li`
  border: 2px solid blue;
  width: 80%;
  min-height: 150px;
  margin-bottom: 50px;
  padding: 20px;
`;
const Title = styled.strong`
  font-size: 20px;
  margin-bottom: 20px;
  display: block;
  color: ${palette.title};
`;

const PostText = styled.p`
  color: ${palette.text};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const PostInfo = styled.div`
  display: flex;
`;

const Category = styled.div`
  color: ${palette.category};
  margin-right: 20px;
`;
