import styled from "styled-components";

export const StyledFilterIcon = styled.div`
	position: relative;

	ul {
		position: absolute;
		width: 120px;
		height: 104px;
		box-shadow: ${({ theme }) => theme.style.shadow};
		background-color: ${({ theme }) => theme.colors.background};
		bottom: -114px;
		right: 0;
		z-index: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;

		li {
			background-color: ${({ theme }) => theme.colors.white};
			border: 1px solid #000;
			width: 84px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border-radius: 16px;
			font-size: 13px;
			cursor: pointer;
		}
	}
`;

export default {};
