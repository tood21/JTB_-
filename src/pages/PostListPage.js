import React from "react";
import styled from "styled-components";
import PostItem from "../components/postlist/PostItem";

const PostListPage = () => {
  return (
    <PostListTemplete>
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
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
