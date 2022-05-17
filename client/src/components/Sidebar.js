import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import firebase from "../fisebase.js";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  useEffect(() => {
    console.log("카테고리정보", props.categoryList);
  }, [props.categoryList]);

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

        <PrListItem
          onClick={() => {
            navigate("/portfolio");
          }}
        >
          포트폴리오
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

      {props.categoryList.map((category, index) => {
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
  border-right: 2px solid black;
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
`;

const WriteButton = styled.button`
  font-size: 20px;
  margin-bottom: 20px;
  color: red;
  cursor: pointer;
`;
