import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', 'Noto Sans', sans-serif;
    padding: 0;
    margin: 0;
    background: #000000;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  select {
    -webkit-appearance: none;
		-moz-appearance: none;
    outline: 0;
  }
`;

export default GlobalStyle;
