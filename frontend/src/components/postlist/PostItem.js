import React from "react";
import palette from "../../lib/styles/palette";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dateChanger } from "../../lib/module/dateChanger";

const PostItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/postdetail/${data._id}`);
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
        <p>{dateChanger(data.publishedDate)}</p>
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
  color: ${palette.black};
`;

const PostText = styled.p`
  color: ${palette.gray};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const PostInfo = styled.div`
  display: flex;
`;

const Category = styled.div`
  color: ${palette.orange};
  margin-right: 20px;
`;
