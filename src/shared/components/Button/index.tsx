import React from "react";
import { css } from "styled-components";
import { StyledButton } from "./buttonStyle";

type ButtonProps = {
  children: string;
  customStyle?: ReturnType<typeof css> | React.CSSProperties;
  handleClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, customStyle, handleClick }: ButtonProps) => (
  <StyledButton customStyle={customStyle}
                onClick={handleClick}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  customStyle: {},
  handleClick: () => console.log("click!")
};

export default Button;
