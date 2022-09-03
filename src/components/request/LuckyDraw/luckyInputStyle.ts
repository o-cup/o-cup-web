import styled from "styled-components";

export const StyledLuckyInput = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;

	.luckyNotice {
		margin-top: 8px;
		font-weight: 400;
		font-size: 10px;
		line-height: 14px;
		color: ${({ theme }) => theme.colors.gray};
	}

	.iconWrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		margin-top: 16px;
	}
`;

export const StyledLuckyTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	> .label {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
	}

	> .options {
		display: flex;
		gap: 10px;

		button {
			gap: 6px;
			background: none;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
      outline: none;
			display: flex;
			align-items: center;
		}
	}
`;

export const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledLuckyContentContainer = styled.ul`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 12px;

	i {
		margin-left: auto;
	}

	> .highlight {
		font-weight: 600;
		font-size: 12px;
		line-height: 26px;
		height: 26px;
		background: url("/images/icons/highlight.png") no-repeat center;
		background-size: 100% 20px;
		padding: 2px 4px 1px 0;
		margin-right: 4px;
		margin-bottom: 6px;
		position: relative;
		white-space: nowrap;
	}

	> .chipContainer {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;

		> button.chipAddButton {
			display: flex;
			align-items: center;
			height: 30px;
			background: ${({ theme }) => theme.colors.white};
			border: 1px solid #000000;
			border-radius: 30px;
			box-shadow: 0 4px 0 #000000;
			padding: 11px 7px;

			> i.plus {
				background: url("/images/icons/plus.png") no-repeat;
				background-size: contain;
				height: 14px;
				width: 14px;
			}
		}
	}
`;

export default {};
