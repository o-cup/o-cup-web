import styled from "styled-components";

export const StyledIcon = styled.i`
	cursor: pointer;

	&.plus-circle {
		display: flex;
		background: url("/images/icons/plus-circle.png") no-repeat;
		background-size: contain;
		height: 24px;
		width: 24px;
	}

	&.delete-circle-white {
		display: flex;
		background: url("/images/icons/delete-circle_white.png") no-repeat;
		background-size: contain;
		height: 20px;
		width: 20px;
	}
`;

export default {};
