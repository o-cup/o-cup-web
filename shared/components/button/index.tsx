import React from "react";
import { StyledButton } from "./buttonStyle";
import type { CustomStyleType } from "../../types";

type ButtonProps = {
	children: string;
	customStyle?: CustomStyleType;
	handleClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, customStyle, handleClick }: ButtonProps) => (
	<StyledButton customStyle={customStyle} onClick={handleClick}>
		{children}
	</StyledButton>
);

Button.defaultProps = {
	customStyle: {},
	handleClick: () => null,
};

export default Button;
