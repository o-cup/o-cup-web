import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import type { ThemeType } from "./theme";

const GlobalStyle = createGlobalStyle<ThemeType>`
  ${reset};
  
  :root {
    --vh: 100%;
  }ß
  
  html {
    scroll-behavior: auto;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: 'Montserrat', 'Noto Sans', sans-serif;
    padding: 0;
    margin: 0;
    background: #fcfbf7;

    // 스크롤바 제거
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
    
    div#root {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &.fixed {
      overflow: hidden;
    }
  }

  input, textarea, select {
    outline: 0;
  }

  input[disabled] {
    color: #000000;
  }
  
  select {
    -webkit-appearance: none;
		-moz-appearance: none;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    cursor: pointer;
  }

`;

export default GlobalStyle;
