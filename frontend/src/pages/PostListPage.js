import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "../components/postlist/PostItem";
import axios from "axios";

const PostListPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const lists = async () => {
      try {
        const response = await axios.get("/api/posts");
        console.log("res", response.data);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    lists();
  }, []);

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
