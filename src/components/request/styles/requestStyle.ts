import styled from "styled-components";

const StyledRequest = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;
	justify-content: space-between;
`;

const StyledEntry = styled.div`
	width: 380px;
	min-width: 380px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;

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

	.artistInputContainer {
		display: flex;
		flex-direction: column;
		gap: 6px;

		> button {
			background: ${({ theme }) => theme.colors.primary};
			color: ${({ theme }) => theme.colors.black};
			border: 2px solid #000000;
			border-radius: 70px;
			box-shadow: 0 4px 0 #000000;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			padding: 10px 16px;
			display: inline-block;
			margin-left: auto;
			margin-top: 10px;
		}
	}
`;

const Label = styled.label<{ hideLabel?: boolean }>`
	line-height: 20px;
	position: relative;
	display: ${(props) => (props.hideLabel ? "none" : "")};
`;

const StyledPreview = styled.div`
	max-width: 520px;
	display: flex;
	justify-content: center;
	width: 100%;
`;

export { StyledRequest, StyledEntry, StyledPreview, Label };
export default {};
