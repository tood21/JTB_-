import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import axios from "axios";
// import Quill from "quill";
import ImageResize from "@looop/quill-image-resize-module-react";
Quill.register("modules/ImageResize", ImageResize);

export const Editor = (props) => {
  const quillElement = useRef(null);

  // const quillInstance = useRef(null);

  const imageHandler = () => {
    console.log("에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!");

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");
    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener("change", async () => {
      console.log("온체인지");
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append("file", file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.post("/api/posts/image/upload", formData);

        const IMG_URL = result.data.filePath;
        console.log("성공 시, 백엔드가 보내주는 데이터", result.data);
        console.log("URl", IMG_URL);
        // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

        // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = quillElement.current.getEditor(); // 에디터 객체 가져오기
        console.log("sdfsdf", editor);
        // 1. 에디터 root의 innerHTML을 수정해주기
        // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
        // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
        // editor.root.innerHTML =
        //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

        // 2. 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log("실패했어요ㅠ");
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [("bold", "italic", "underline", "strike")], // toggled buttons
          ["blockquote", "code-block"],

          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: { modules: ["Resize"] },
    }),
    []
  );

  const formats = [
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "align",
    "indent",
    "color",
    "background",
    "clean",
    "image",
  ];

  //
  const onChangeHandler = (value, delta, user, editor) => {
    props.setContent(editor.getHTML());
    props.setText(editor.getText());
  };

  return (
    <EditorWrapper>
      <ReactQuill
        value={props.content || ""}
        modules={modules}
        onChange={onChangeHandler}
        theme='snow'
        placeholder='내용을 입력해주세요.'
        ref={quillElement}
        formats={formats}
      />
    </EditorWrapper>
  );
};

const EditorWrapper = styled.div`
  font-family: "NotoSansKr";
  min-height: 300px;
`;
