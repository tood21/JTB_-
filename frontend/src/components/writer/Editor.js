import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";

export const Editor = (props) => {
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
      // handlers: {
      //   image: imageHandler,
      // },
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

    //현재 입력 되어 있는 데이터(글, 그림 등등을 html형식으로 보여줌)
    const quill = quillInstance.current;
    console.log(
      quill.on("text-change", (delta, oldDelta, source) => {
        props.setContent(quill.root.innerHTML);
      })
    );
  }, []);

  useEffect(() => {
    if (props.postData) {
      quillInstance.current.root.innerHTML = props.postData.content;
    }
  }, [props.postData]);

  return <EditorWrapper ref={quillElement} />;
};

const EditorWrapper = styled.div`
  font-family: "NotoSansKr";
  min-height: 300px;
`;
