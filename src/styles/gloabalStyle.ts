import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    ${reset};
    font-family: 'Source Sans Pro', sans-serif;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;
