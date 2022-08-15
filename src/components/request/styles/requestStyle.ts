import styled from "styled-components";

const StyledRequest = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;
`;

const StyledEntry = styled.div`
	width: 50%;
	max-width: 520px;
	min-width: 380px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	padding: 0 70px;

	.notice {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 12px;
		width: 100%;

		p:first-child {
			width: 133px;
			height: 28px;
			background-color: ${({ theme }) => theme.colors.black};
			color: ${({ theme }) => theme.colors.white};
			font-weight: bold;
			border-radius: 30px;
			text-align: center;
			line-height: 28px;
		}

		p:not(:first-child) {
			line-height: 16px;
		}
	}

	.inputsWrapper {
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 100%;

		.hashTags {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;

			.iconWrapper {
				display: flex;
				width: 100%;
				justify-content: center;
			}
		}
	}
`;

const StyledPreview = styled.div`
	width: 50%;
	max-width: 520px;
	display: flex;
	justify-content: center;
`;

export { StyledRequest, StyledEntry, StyledPreview };
export default {};
