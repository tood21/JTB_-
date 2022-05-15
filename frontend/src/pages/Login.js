import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebase from "../fisebase.js";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setErrMessage("");
    }, 3000);
  }, [errMessage]);

  useEffect(() => {
    if (user.accessToken) {
      alert("이미 로그인 중입니다.");
      navigate("/");
    }
  }, []);

  const signInHandler = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      return alert("모든 값을 채워주세요");
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrMessage("이메일이나 비밀번호가 잘못되었습니다.");
      } else if (error.code === "auth/wrong-password") {
        setErrMessage("이메일이나 비밀번호가 잘못되었습니다.");
      } else {
        setErrMessage("로그인이 실패하였습니다.");
      }
    }
  };
  return (
    <LoginDiv>
      <form>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        {errMessage !== "" && (
          <p style={{ color: "red", fontSize: "16px" }}>{errMessage}</p>
        )}
        <button onClick={(e) => signInHandler(e)}>로그인</button>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Login;

const LoginDiv = styled.div`
  width: 50%;
  max-width: 375px;
  margin: 5rem auto 0;
  form {
    padding: 20px;
    box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
      0px 15px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    label {
      font-weight: bold;
      margin-bottom: 5px;
    }
    input {
      font-size: 1.5rem;

      border-radius: 10px;
      border: 1px solid #c6c6c6;
      padding: 5px;
      margin-bottom: 10px;
    }
    button {
      font-size: 1.5rem;
      border-radius: 15px;
      padding: 5px 10px;
      background-color: black;
      color: white;
      border: 1px solid black;
      margin-top: 10px;
      &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
      }
    }
  }
`;
