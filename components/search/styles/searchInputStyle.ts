import styled from "styled-components";

export const StyledSearchInput = styled.div<{ showResult: boolean }>`
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;

	border: 1px solid red;
	height: 40px;
	border: 2px solid #000;
	border-radius: 4px;
	background-color: #fff;

	.select {
		border-right: 2px solid #000;
		height: 100%;
		min-width: 102px;

		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		p {
			text-align: center;
			font-size: 16px;
			position: absolute;
			left: 15px;
			top: 17.5px;
			transform: translateY(-50%);
			user-select: none;
		}

		svg {
			position: absolute;
			right: 7px;
			cursor: pointer;
		}
	}

	ul.category {
		position: absolute;
		background-color: #fff;

		width: 106px;

		top: 40px;
		left: -2px;

		z-index: 1;
	}

	input {
		font-size: 16px;
		background: ${({ theme }) => theme.colors.white};
		padding: ${(props) =>
			props.showResult ? "0 65px 0 10px" : "0 42px 0 10px"};
		width: 100%;
		line-height: 34px;
	}

	ul.autoComplete {
		width: 100%;

		position: absolute;

		width: 440px;
		top: 36px;
		left: -2px;

		z-index: 1;
		border: 2px solid #000;
		border-radius: 4px;

		background-color: white;

		li {
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;

			i.arrow-up-right {
				width: 20px;
			}

			&:nth-child(2n) {
				background: #f6f6f6;
			}
		}
	}

	i.delete {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 12px;
	}

	> button {
		width: 40px;
		height: 40px;
		margin-left: 20px;
		background: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.black};
		border: 2px solid #000000;
		border-radius: 50%;
		padding: 0;
		cursor: pointer;

		> svg {
			width: 19px;
			height: 19px;
			margin: 2px 0 -2px;
		}
	}
`;

export const StyledOption = styled.li<{ selected: boolean }>`
	height: 44px;
	line-height: 44px;
	font-size: 16px;
	padding: 0 20px;
	cursor: pointer;

	background-color: ${(props) =>
		props.selected ? props.theme.colors.softPrimary : ""};
`;

export default {};
