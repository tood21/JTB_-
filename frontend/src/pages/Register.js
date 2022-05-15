import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../fisebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [ninknameCheckMessage, setNicknameCheckMessage] = useState("");

  useEffect(() => {
    if (user.accessToken) {
      alert("이미 로그인 중입니다.");
      navigate("/");
    }
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(e);

    if (!(nickname && email && password && passwordConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (!(password.length > 5)) {
      return alert("비밀번호는 6자 이상 입력해주세요!");
    }
    if (!nicknameCheck) {
      return alert("닉네임 중복검사를 진행해 주세요.");
    }

    if (password !== passwordConfirm) {
      return alert("비밀번호화 비밀번호 확인 값은 같아야 합니다.");
    } else {
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await createdUser.user.updateProfile({
        displayName: nickname,
      });
      let body = {
        email: createdUser.user.multiFactor.user.email,
        displayName: createdUser.user.multiFactor.user.displayName,
        uid: createdUser.user.multiFactor.user.uid,
      };

      axios.post("/api/user/register", body).then((response) => {
        if (response.data.success) {
          navigate("/login");
        } else {
          return alert("회원가입이 실패하였습니다.");
        }
      });
    }
  };
  const nicknameCheckHandler = (e) => {
    e.preventDefault();
    if (!nickname) {
      alert("닉네임을 입력해주세요");
    }
    let body = {
      displayName: nickname,
    };
    axios.post("/api/user/namecheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNicknameCheck(true);
          setNicknameCheckMessage("사용가능한 닉네임입니다.");
        } else {
          setNicknameCheck(false);
          setNicknameCheckMessage("사용불가능한 닉네임입니다.");
        }
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label htmlFor='nickname'>닉네임</label>
        <input
          id='nickname'
          type='name'
          value={nickname}
          disabled={nicknameCheck}
          onChange={(e) => {
            setNickname(e.currentTarget.value);
          }}
        />
        {nicknameCheck ? (
          <p style={{ color: "red" }}>{ninknameCheckMessage}</p>
        ) : (
          <p style={{ color: "blue" }}>{ninknameCheckMessage}</p>
        )}
        <button
          style={{ marginBottom: "15px" }}
          onClick={(e) => {
            nicknameCheckHandler(e);
          }}
        >
          닉네임 중복검사
        </button>
        <label>이메일</label>
        <input
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type='password'
          value={password}
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
        <button
          onClick={(e) => {
            registerHandler(e);
          }}
        >
          회원가입
        </button>
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
