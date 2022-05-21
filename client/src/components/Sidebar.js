import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import firebase from "../fisebase.js";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [categoryList, setCategoryList] = useState([]);

  const logoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  useEffect(() => {
    axios.get("/api/posts/").then((response) => {
      let temp = [];
      temp = response.data.postList.map((data) => data.category);
      const newArr = new Set(temp);
      setCategoryList([...newArr]);
    });
  }, []);

  return (
    <Side>
      <SidebarTitle
        onClick={() => {
          navigate("/");
        }}
      >
        스톤보트의 기술블로그
      </SidebarTitle>

      <PrList>
        <PrListItem
          onClick={() => {
            navigate("/resume");
          }}
        >
          이력서
        </PrListItem>
      </PrList>

      {user.accessToken ? (
        <PrListItem
          onClick={() => {
            logoutHandler();
          }}
        >
          로그아웃
        </PrListItem>
      ) : (
        <PrListItem
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </PrListItem>
      )}

      <WriteButton
        type='button'
        onClick={() => {
          navigate("/writer");
        }}
      >
        글 작성하기
      </WriteButton>

      {categoryList.map((category, index) => {
        return <SidebarItem key={index} category={category} />;
      })}
    </Side>
  );
};

export default Sidebar;

const Side = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const SidebarTitle = styled.h1`
  margin: 120px 0 120px;
  font-size: 24px;
`;

const PrList = styled.ul`
  text-align: center;
  margin-bottom: 40px;
`;

const PrListItem = styled.li`
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 20px;
  list-style: none;
`;

const WriteButton = styled.button`
  font-size: 20px;
  margin-bottom: 20px;
  color: red;
  cursor: pointer;
`;
