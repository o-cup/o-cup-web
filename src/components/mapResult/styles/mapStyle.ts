import styled from "styled-components";

export const StyledMapResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

export const StyledFullMap = styled.div`
	width: 100%;
	height: 100vh;
	background: ${({ theme }) => theme.colors.white};
`;

export const StyledMapHeader = styled.div`
	width: 100%;
	max-width: ${({ theme }) => theme.widths.layout};
	background: transparent;
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.header};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	height: ${({ theme }) => theme.heights.header};

	> button {
		width: 36px;
		height: 36px;
		background: ${({ theme }) => theme.colors.white};
		border: 2px solid ${({ theme }) => theme.colors.black};
		border-radius: 36px;
		padding: 6px;
		cursor: pointer;

		> img {
			width: 20px;
			height: 20px;
		}
	}
`;

export default {};
