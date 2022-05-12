import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <LoginDiv>
      <form>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
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
        <button>로그인</button>
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
