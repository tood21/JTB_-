import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarItem = ({ category }) => {
  const navigate = useNavigate();
  return (
    <ul>
      <List onClick={() => navigate(`/?category=${category}`)}>{category}</List>
    </ul>
  );
};

export default SidebarItem;

const List = styled.li`
  font-size: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;
