import styled from "styled-components";
import type { CustomStyleType } from "../../types";

type ButtonProps = {
	customStyle?: CustomStyleType;
};

export const StyledButton = styled.button.attrs(
	({ customStyle }: ButtonProps) => ({
		style: {
			...customStyle,
		},
	})
)<ButtonProps>`
	height: 77px;
	background: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.black};
	border: 2px solid #000000;
	border-radius: 70px;
	box-shadow: 0 4px 0 #000000;
	font-weight: normal;
	font-size: 18px;
`;

export default {};
