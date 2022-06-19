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

    & > div:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default GlobalStyle;
