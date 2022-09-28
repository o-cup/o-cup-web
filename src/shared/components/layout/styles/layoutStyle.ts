import styled from "styled-components";

const StyledLayout = styled.div`
	width: 100%;
	min-width: 320px;
	min-height: 100vh;
	min-height: calc(var(--vh, 1vh) * 100);
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${({ theme }) => theme.colors.background};
	max-width: ${({ theme }) => theme.widths.layout};
	box-shadow: ${({ theme }) => theme.style.shadow.default};
`;

const StyledContent = styled.main`
	width: 100%;
	padding-top: ${({ theme }) => theme.heights.header};
`;

const StyledFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 100px 0 50px 0;
	text-align: center;
	gap: 12px;

	> p {
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		text-align: center;
	}
`;

export { StyledLayout, StyledContent, StyledFooter };
export default {};
