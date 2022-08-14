import styled from "styled-components";

const StyledRequest = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;

	display: flex;

	.previewField {
		width: 50%;
		height: 100vh;
		border: 1px solid blue;
	}
`;

const StyledEntry = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;

	border: 1px solid red;
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

export { StyledRequest, StyledEntry };
export default {};
