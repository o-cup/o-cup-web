import React from "react";
import { css } from "styled-components";
import { StyledButton } from "./buttonStyle";

type ButtonProps = {
	children: string;
	customStyle?: ReturnType<typeof css> | React.CSSProperties;
};

const Button = ({ children, customStyle }: ButtonProps) => (
	<StyledButton customStyle={customStyle}>{children}</StyledButton>
);

Button.defaultProps = {
	customStyle: {},
};

export default Button;
