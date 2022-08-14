import styled from "styled-components";

const StyledRequest = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 20px;

	.notice {
		display: flex;
		flex-direction: column;
		gap: 10px;

		p:first-child {
			width: 133px;
			height: 28px;
			background-color: ${({ theme }) => theme.colors.black};
			color: ${({ theme }) => theme.colors.white};
			font-size: 12px;
			font-weight: bold;
			border-radius: 30px;
			text-align: center;
			line-height: 28px;
		}

		p:not(:first-child) {
			line-height: 20px;
		}
	}
`;

export { StyledRequest };
export default {};
