import React from "react";
import styled from "styled-components";
import PostItem from "../components/postlist/PostItem";
import data from "../dummyData";

const PostListPage = () => {
  return (
    <PostListTemplete>
      {data.map((data, index) => (
        <PostItem key={index} data={data} />
      ))}
    </PostListTemplete>
  );
};

export default PostListPage;

const PostListTemplete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;
