import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ThemeType } from "./theme";

const GlobalStyle = createGlobalStyle<ThemeType>`
  ${reset};

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: 'Montserrat', 'Noto Sans', sans-serif;
    padding: 0;
    margin: 0;
    background: #fcfbf7;

    div#root {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  input, textarea, select {
    outline: 0;
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
