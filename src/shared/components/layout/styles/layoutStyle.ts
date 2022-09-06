import styled from "styled-components";

const StyledLayout = styled.div`
	width: 100%;
	min-width: 320px;
	min-height: 100vh;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.colors.background};

	main {
		padding-top: ${({ theme }) => theme.heights.header};
	}

	@media ${({ theme }) => theme.device.mobile} {
		max-width: 720px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		max-width: 1080px;
	}
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

export { StyledLayout, StyledFooter };
export default {};
