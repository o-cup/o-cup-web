import styled from "styled-components";

export const StyledMonthSelector = styled.div`
	min-width: 311px;
	height: 72px;
	border: 2px solid #000;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: 10px;
	background-color: ${({ theme }) => theme.colors.white};

	h2 {
		font-size: 18px;
		font-weight: bold;
		line-height: 25px;
	}

	.toggle {
		display: flex;
		gap: 5px;

		p {
			font-size: 14px;
			line-height: 19px;
			width: fit-content;
		}
	}
`;

export default {};
