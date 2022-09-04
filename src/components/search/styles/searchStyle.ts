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
		justify-content: space-between;
		gap: 20px;

		div:first-child:after {
			content: "";
			background: url("/images/bread.png") no-repeat;
			background-size: auto 72px;
			position: absolute;
			top: -2px;
			right: -10px;
			height: 104px;
			width: 20px;
		}

		div.sort {
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
			width: fit-content;
		}
	}

	.biases {
		display: flex;
		flex-wrap: wrap;
		row-gap: 20px;
		padding: 12px 0;
	}
`;

export const ResetModalBtn = styled.div`
	display: flex;
	align-items: center;
	font-size: 10px;
	gap: 3px;

	i.reset {
		width: 16px;
		height: 16px;
	}
`;

export default {};
