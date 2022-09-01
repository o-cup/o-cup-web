import styled from "styled-components";

const StyledLayout = styled.div`
	width: 100%;
	min-width: 320px;
	min-height: 100vh;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${({ theme }) => theme.colors.background};

	max-width: ${({ theme }) => theme.maxWidths.layout};

	/* @media ${({ theme }) => theme.device.mobile} {
		max-width: 720px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		max-width: 1080px;
	} */
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

	> ul {
		display: none;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;

		> li {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 52px;
			height: 52px;
			background: ${({ theme }) => theme.colors.primary};
			border: 2px solid #000000;
			border-radius: 35px;
			font-size: 20px;
			cursor: pointer;
		}

		> li:not(:last-child) {
			margin-right: 32px;
		}
	}

	> p {
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		text-align: center;
	}
`;

export { StyledLayout, StyledContent, StyledFooter };
export default {};
