import styled from "styled-components";

export const StyledSearch = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;

	.input {
		height: 68px;
		display: flex;
		align-items: center;
		width: 100%;
	}
`;

export const StyledFilter = styled.div`
	.months {
		height: 104px;
		display: flex;
		padding: 16px 0 16px 0;
		position: relative;
		width: 100%;

		div.sort {
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
		}
	}

	.biases {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		padding: 12px 0;
	}
`;

export default {};
