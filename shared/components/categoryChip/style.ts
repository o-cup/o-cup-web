import styled from "styled-components";
import React from "react";

export const StyledCategoryChip = styled.div<{
	type: "A" | "B" | "C" | "D" | "E";
	handleClick?: (e: React.MouseEvent) => void;
	selected?: boolean;
	opacity?: number;
	disabled?: boolean;
}>`
	display: inline-block;
	width: fit-content;
	height: 30px;
	position: relative;
	cursor: pointer;
	opacity: ${(props) => props.opacity};
	pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

	p {
		background: ${({ theme }) => theme.colors.white};
		border: 1px solid #000000;
		border-radius: 30px;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		padding: 6px 12px;
		margin-bottom: 4px;
		position: relative;
		z-index: 2;
		white-space: nowrap;
	}

	span.shadow {
		content: "";
		position: absolute;
		top: 4px;
		left: 0;
		z-index: 1;
		display: block;
		width: 100%;
		height: 30px;
		background: ${(props) => props.theme.category[props.type].primary};
		border: 1px solid #000000;
		border-radius: 30px;
	}

	&.selected {
		p {
			background: ${(props) => props.theme.category[props.type].background};
			font-weight: 700;
		}

		span.shadow {
			background: ${({ theme }) => theme.colors.black};
		}
	}
`;

export default {};
