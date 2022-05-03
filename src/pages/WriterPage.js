import React from "react";
import { Editor } from "../components/writer/Editor";
import styled from "styled-components";

const WriterPage = () => {
  return (
    <Wrapper>
      <Editor />
    </Wrapper>
  );
};

export default WriterPage;

const Wrapper = styled.div`
  width: 100%;
`;
