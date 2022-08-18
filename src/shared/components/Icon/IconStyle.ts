import styled from "styled-components";

export const StyledIcon = styled.i`
	cursor: pointer;

	&.logo {
		display: flex;
		background: url("/images/logo_primary.png") no-repeat;
		background-size: contain;
		height: 56px;
		width: 75px;
	}

	&.plus-circle {
		display: flex;
		background: url("/images/icons/plus-circle.png") no-repeat;
		background-size: contain;
		height: 24px;
		width: 24px;
	}

	&.delete {
		display: flex;
		background: url("/images/icons/delete.png") no-repeat;
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

	&.search {
		display: flex;
		background: url("/images/icons/search.png") no-repeat;
		background-size: contain;
		height: 24px;
		width: 24px;
	}

	&.sort {
		display: flex;
		background: url("/images/icons/sort.png") no-repeat;
		background-size: contain;
		height: 24px;
		width: 24px;
	}
`;

export default {};
