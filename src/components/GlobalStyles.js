import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
  font-family: "NotoSansKR";
  src: url("../src/assets/font/NotoSansKR-Medium.otf") format("opentype");
  }

  * {
    box-sizing: border-box;
  }
  body{
    background-color: #ffffff;
    font-family: "NotoSansKR",Arial,sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family: "NotoSansKR",Arial,sans-serif;

  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
