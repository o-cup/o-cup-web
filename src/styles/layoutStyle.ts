import styled from "styled-components";

const StyledLayout = styled.div`
	width: 100%;
	min-width: 320px;
	min-height: 100vh;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.colors.background};
	/* box-shadow: 0 0 20px rgb(0 0 0 / 5%); */

	@media ${({ theme }) => theme.device.mobile} {
		max-width: 720px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		max-width: 1080px;
	}
`;

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;

	> .date_selector {
		display: flex;
		align-items: center;
		font-size: 24px;
		line-height: 30px;
		font-weight: 700;

		> p {
			margin: 0 10px;
		}

		> button {
			width: 24px;
			height: 24px;
			background: ${({ theme }) => theme.colors.white};
			border: 1px solid #000000;
			border-radius: 50%;
			padding: 0;
			position: relative;
			cursor: pointer;

			&:last-child {
				transform: rotate(180deg);
			}

			> svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-65%, -50%);
			}
		}
	}
`;

const StyledFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	/* padding: 32px 20px 50px; */
	padding: 100px 0 50px 0;
	text-align: center;

	> ul {
		/* display: flex; */
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

export { StyledLayout, StyledHeader, StyledFooter };
export default {};
