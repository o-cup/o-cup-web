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
	position: relative;

	h2 {
		font-size: 18px;
		font-weight: bold;
		line-height: 25px;
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: 5px;

		p {
			font-size: 14px;
			line-height: 19px;
			width: fit-content;
		}
	}

	.selectBox {
		width: 380px;
		height: 96px;
		border: 2px solid #000;
		position: absolute;
		bottom: -102px;
		left: -2px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
		display: flex;
		justify-content: space-around;
		gap: 10px;
		flex-wrap: wrap;
		padding: 10px;
		background-color: ${({ theme }) => theme.colors.white};
		z-index: 1;
	}
`;

export const Month = styled.span<{ isActive: boolean }>`
	width: 46px;
	height: 30px;
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	border-radius: 4px;

	background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.black)};
	color: ${({ isActive, theme }) => (isActive ? theme.colors.black : theme.colors.white)};
	border: ${({ isActive }) => (isActive ? "2px solid #000" : "")};
	line-height: ${({ isActive }) => (isActive ? "28px" : "30px")};
`;

export default {};
