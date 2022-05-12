import React, { useState } from "react";
import styled from "styled-components";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  return (
    <LoginDiv>
      <form>
        <label>닉네임</label>
        <input
          type='name'
          value={nickname}
          onChange={(e) => {
            setNickname(e.currentTarget.value);
          }}
        />
        {/* <button
          onClick={(e) => {
            NameCheckFunc(e);
          }}
        >
          닉네임 중복검사
        </button> */}
        <label>이메일</label>
        <input
          type='email'
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type='password'
          value={password}
          minLength={8}
          onChange={(e) => {
            setpassword(e.currentTarget.value);
          }}
        />
        <label>비밀번호확인</label>
        <input
          type='password'
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.currentTarget.value);
          }}
        />
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;

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
