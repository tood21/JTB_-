import React from "react";
import palette from "../../lib/styles/palette";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dateChanger } from "../../lib/module/dateChanger";

const PostItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/post/detail/${data.postNum}`);
      }}
    >
      <Title>
        {data.title.length < 70 ? data.title : data.title.slice(0, 70) + "..."}
      </Title>
      <PostInfo>
        <Category>{data.category}</Category>
        <WriteDate>{dateChanger(data.publishedDate)}</WriteDate>
        <div>작성자 : {data.author.displayName} </div>
      </PostInfo>
      <PostText
        dangerouslySetInnerHTML={{
          __html:
            data.text.length < 150
              ? data.text
              : data.text.slice(0, 150) + "...",
        }}
      ></PostText>
    </Container>
  );
};

export default PostItem;

const Container = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 200px;
  margin-bottom: 50px;
  padding: 20px;
  list-style: none;
  border-radius: 10px;
  -webkit-box-shadow: 8px 8px 7px 0px rgba(0, 0, 0, 0.52);
  box-shadow: 8px 8px 7px 0px rgba(0, 0, 0, 0.52);
`;
const Title = styled.strong`
  font-size: 24px;
  margin-bottom: 20px;
  display: block;
  font-weight: bold;
  color: ${palette.black};
`;

const PostText = styled.p`
  color: ${palette.black};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const PostInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 13px;
`;

const WriteDate = styled.div`
  color: ${palette.gray};
  margin-right: 10px;
`;

const Category = styled.div`
  margin-right: 20px;
  color: ${palette.orange};
`;
