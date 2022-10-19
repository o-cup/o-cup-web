import styled from "styled-components";

export const StyledSearchInput = styled.div<{ showResult: boolean }>`
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;

	border: 1px solid red;
	height: 38px;
	border: 2px solid #000;
	border-radius: 32px;
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

	ul {
		position: absolute;
		background-color: #fff;

		width: 106px;

		top: 38px;
		left: -2px;

		z-index: 1;
	}

	input {
		font-size: 16px;
		background: ${({ theme }) => theme.colors.white};
		/* padding: 0 45px 0 10px; */
		padding: ${(props) =>
			props.showResult ? "0 65px 0 10px" : "0 42px 0 10px"};
		width: 100%;
		border-radius: 32px;
		line-height: 34px;
	}

	i.search {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 17px;
	}

	i.delete {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 40px;
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
