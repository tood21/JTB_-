import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "../components/postlist/PostItem";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/postlist/Pagination";

const PostListPage = () => {
  const [PostList, setPostList] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState([]);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    const lists = async () => {
      try {
        const response = await axios.get(
          `/api/posts/list?category=${category}`
        );
        if (response.data.success) {
          setPostList([...response.data.postList]);
          setCurrentPage(1);
          if (response.data.postList.length < 11) {
            setNextDisabled(true);
          } else {
            setNextDisabled(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    lists();
  }, [category]);

  useEffect(() => {
    setTotalPage(Math.floor(PostList.length / 10 + 1));
    let newArr = PostList.slice((currentPage - 1) * 10, currentPage * 10);
    setCurrentPageData(newArr);
  }, [PostList, currentPage]);

  useEffect(() => {
    let temp = [];

    for (let i = 1; i <= totalPage; i++) {
      temp[i - 1] = i;
    }

    setPageNum([...temp]);
  }, [totalPage]);

  return (
    <PostListTemplete>
      {currentPageData.map((data, index) => (
        <PostItem key={index} data={data} />
      ))}

      <Pagination
        nextDisabled={nextDisabled}
        setNextDisabled={setNextDisabled}
        currentPageData={currentPageData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        pageNum={pageNum}
      />
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
