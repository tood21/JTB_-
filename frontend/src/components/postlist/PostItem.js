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
        <div style={{ marginRight: "10px" }}>
          {dateChanger(data.publishedDate)}
        </div>
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
  border: 2px solid blue;
  width: 80%;
  height: 200px;
  margin-bottom: 50px;
  padding: 20px;
`;
const Title = styled.strong`
  font-size: 24px;
  margin-bottom: 20px;
  display: block;
  font-weight: bold;
  color: ${palette.black};
`;

const PostText = styled.p`
  color: ${palette.gray};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const PostInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Category = styled.div`
  color: ${palette.orange};
  margin-right: 20px;
`;
