import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const menus = [
    { name: "자바스크립트", path: "/resume" },
    { name: "리액트", path: "/mylist" },
    { name: "리액트", path: "/mylist" },
  ];
  return (
    <Side>
      <SidebarTitle>스톤보트의 기술블로그</SidebarTitle>
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
      {menus.map((menu, index) => (
        <SidebarItem menu={menu} />
      ))}
    </Side>
  );
};

export default Sidebar;

const Side = styled.div`
  width: 300px;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  cursor: pointer;
`;

const PrListItem = styled.li`
  font-size: 20px;
  margin-bottom: 20px;
`;
