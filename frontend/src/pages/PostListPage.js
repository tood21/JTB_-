import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "../components/postlist/PostItem";
import axios from "axios";

const PostListPage = () => {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    const lists = async () => {
      try {
        const response = await axios.post("/api/posts/list");
        console.log("res", response.data);
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    lists();
  }, []);

  return (
    <PostListTemplete>
      {PostList.reverse().map((data, index) => {
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
