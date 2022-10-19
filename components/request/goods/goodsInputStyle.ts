import styled from "styled-components";

const StyledGoodsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	> .label {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		margin-bottom: 6px;
	}

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
		margin-top: -16px;
	}
`;

const StyledGoodsTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 6px;

	> .label {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
	}

	> .checkOpen {
		opacity: 1;

		> button {
			display: flex;
			align-items: center;
			gap: 6px;
			background: none;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			outline: none;
			color: ${({ theme }) => theme.colors.black};
		}
	}
`;

const StyledGoodsInput = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;
	margin-bottom: 30px;

	> .goodsOptionList {
		margin-top: -8px;
	}
`;

const StyledSelectWrapper = styled.div`
	position: relative;
	height: 48px;
	width: 100%;
	display: flex;
	border: 2px solid ${({ theme }) => theme.colors.black};
	border-radius: 4px;
	background: #e5e5e5;
	align-items: center;
	padding: 0 16px;

	input {
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #000000;
	}

	input[disabled] {
		background: #e5e5e5;
	}

	button {
		display: flex;
		background: url("/images/icons/dropdown-arrow.png") no-repeat;
		background-size: contain;
		height: 24px;
		width: 24px;
		cursor: pointer;
	}
`;

const StyledInputWrapper = styled.div`
	position: relative;
	height: 48px;
	width: 100%;
	display: flex;
	border: 2px solid ${({ theme }) => theme.colors.black};
	border-radius: 4px;
	justify-content: center;
	align-items: center;
	padding: 0 16px;
	background: #ffffff;

	input {
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #000000;
	}

	> .iconContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
`;

const StyledChipContainer = styled.ul`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 6px;

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
`;

export {
	StyledGoodsContainer,
	StyledGoodsTitle,
	StyledGoodsInput,
	StyledSelectWrapper,
	StyledInputWrapper,
	StyledChipContainer,
};
export default {};
