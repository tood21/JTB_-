import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";

export const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [("bold", "italic", "underline", "strike")], // toggled buttons
          ["blockquote", "code-block"],

          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image"],
          ["clean"], // remove formatting button
        ],
      },
      formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
      ],
    });
  }, []);

  return (
    <Wrapper>
      <TitleInput placeholder='제목을 입력하세요' />
      <EditorWrapper ref={quillElement} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 100px;
`;

const TitleInput = styled.input`
  width: 100%;
  border-bottom: #ccc 1px solid;
  font-size: 34px;
  margin-bottom: 20px;
  padding: 10px;
`;

const EditorWrapper = styled.div`
  font-family: "NotoSansKr";
  min-height: 400px;
`;
