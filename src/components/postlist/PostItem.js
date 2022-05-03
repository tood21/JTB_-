import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const PostItem = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate("/postdetail");
      }}
    >
      <Title>Promise 정리: async/await 사용법 & then과의 차이</Title>
      <PostText>
        서비스 개발을 하다보면 비동기적으로 개발해야 할 일이 많습니다.
        JavaScript에서는 과거 callback 함수를 통해 비동기를 구현하곤 했으나
        요즘에는 Promise 객체를 반환하게 하여 async와 await로 작업이 완료되면
        다음 로직이 진행되게끔 지연시키는 방식을 통해 비동기를 구현하곤 합니다.
      </PostText>
      <PostInfo>
        <Category>카테고리</Category>
        <p>2022년 2월 22일</p>
      </PostInfo>
    </Container>
  );
};

export default PostItem;

const Container = styled.li`
  border: 2px solid blue;
  width: 80%;
  min-height: 150px;
  margin-bottom: 50px;
  padding: 20px;
`;
const Title = styled.strong`
  font-size: 20px;
  margin-bottom: 20px;
  display: block;
  color: ${palette.title};
`;

const PostText = styled.p`
  color: ${palette.text};
  margin-bottom: 20px;
`;

const PostInfo = styled.div`
  display: flex;
`;

const Category = styled.div`
  color: ${palette.category};
  margin-right: 20px;
`;
