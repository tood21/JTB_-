import "./App.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import styled from "styled-components";
import firebase from "./fisebase.js";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import PortfolioPage from "./pages/PortfolioPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostListPage from "./pages/PostListPage";
import ResumePage from "./pages/ResumePage";
import WriterPage from "./pages/WriterPage";
import PostEditPage from "./pages/PostEditPage";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  useEffect(() => {
    console.log("카테고리 리스트", categoryList);
  }, [categoryList]);

  useEffect(() => {
    axios.post("/api/posts/list").then((response) => {
      let temp = [];
      temp = response.data.postList.map((data) => data.category);
      const newArr = new Set(temp);
      setCategoryList([...newArr]);
    });
  }, []);
  return (
    <Wrapper padding={sidebar}>
      {sidebar ? <Sidebar categoryList={categoryList} /> : null}
      <Button move={sidebar} onClick={() => setSidebar(!sidebar)} type='button'>
        {sidebar ? "X" : <FontAwesomeIcon icon={faBars} />}
      </Button>
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/:category' element={<PostListPage />} />
        <Route path='/resume' element={<ResumePage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='/writer' element={<WriterPage />} />
        <Route path='/post/detail/:postNum' element={<PostDetailPage />} />
        <Route path='/post/edit/:postNum' element={<PostEditPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
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
