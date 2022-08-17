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
		/* header 높이와 맞추기 */
		padding-top: 76px;
	}

	@media ${({ theme }) => theme.device.mobile} {
		max-width: 720px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		max-width: 1080px;
	}
`;

const StyledHeader = styled.header<{ mainPage: boolean }>`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1080px;
	z-index: 99;
	background: rgba(252, 251, 247, 0.9);
	backdrop-filter: blur(4px);

	> div#header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 1080px;
		height: 76px;
		padding: 0 24px;
		border-bottom: ${(props) => (props.mainPage ? "" : "2px solid #000")};

		h1 {
			font-size: 18px;
			font-weight: bold;
		}

		> div {
			width: fit-content;
			display: flex;
			height: 100%;
			align-items: center;
			gap: 22px;
		}

		img#logo {
			height: 56px;
		}

		.date_selector {
			display: flex;
			align-items: center;

			> p {
				text-align: center;
				font-weight: 700;
				font-size: 22px;
				line-height: 27px;
				margin-right: 8px;
				white-space: nowrap;
			}

			> button.calendarOpenButton {
				background: none;
				outline: none;

				&.active {
					transform: rotate(180deg);
				}
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
