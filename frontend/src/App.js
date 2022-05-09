import "./App.css";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import PortfolioPage from "./pages/PortfolioPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostListPage from "./pages/PostListPage";
import ResumePage from "./pages/ResumePage";
import WriterPage from "./pages/WriterPage";
import PostEditPage from "./pages/PostEditPage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <Wrapper padding={sidebar}>
      {sidebar ? <Sidebar /> : null}
      <Button move={sidebar} onClick={() => setSidebar(!sidebar)} type='button'>
        {sidebar ? "X" : <FontAwesomeIcon icon={faBars} />}
      </Button>
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/resume' element={<ResumePage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='/writer' element={<WriterPage />} />
        <Route path='/post/detail/:postNum' element={<PostDetailPage />} />
        <Route path='/post/edit/:postNum' element={<PostEditPage />} />
      </Routes>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  padding-left: ${(props) => (props.padding === true ? "300px" : "0px")};
`;

const Button = styled.button`
  position: absolute;
  font-size: 20px;
  width: 50px;
  height: 50px;
  border-left: none;
  top: 0;
  left: 300px;
  transition: all 0.3s ease;
  transform: ${(props) =>
    props.move === true ? "translateX(0)" : "translateX(-300px)"};
`;
