import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "../components/postlist/PostItem";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PostListPage = () => {
  const [PostList, setPostList] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const lists = async () => {
      try {
        const response = await axios.get(
          `/api/posts/list?category=${category}`
        );
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    lists();
  }, [category]);

  return (
    <PostListTemplete>
      {PostList.map((data, index) => {
        return <PostItem key={index} data={data} />;
      })}
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
