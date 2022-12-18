import styled from "styled-components";
import type { ColorsType, CustomStyleType } from "../../types";

type StyledChipProps = {
	customStyle?: CustomStyleType;
	bgColor: ColorsType;
};

export const StyledChip = styled.span.attrs(
	({ customStyle }: StyledChipProps) => ({
		style: {
			...customStyle,
		},
	})
)<StyledChipProps>`
	width: fit-content;
	height: 30px;
	border: 2px solid #000;
	border-radius: 20px;
	font-size: 13px;
	font-weight: bold;
	padding: 0 10px;

	display: inline-flex;
	align-items: center;
	white-space: nowrap;

	i.delete {
		width: 14px;
		height: 14px;
		margin-left: 5px;
	}
`;

export default {};
