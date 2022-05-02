import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarItem = ({ menu }) => {
  const navigate = useNavigate();
  return (
    <ul>
      <List
        onClick={() => {
          navigate(`${menu.path}`);
        }}
      >
        {menu.name}
      </List>
    </ul>
  );
};

export default SidebarItem;

const List = styled.li`
  font-size: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;
