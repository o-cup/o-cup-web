import styled from "styled-components";

export const StyledHeader = styled.header<{ mainPage: boolean }>`
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
		/* border-bottom: ${(props) => (props.mainPage ? "" : "2px solid #000")}; */
		position: relative;

		h1 {
			font-size: 18px;
			font-weight: bold;
			position: absolute;
			left: 0;
			right: 0;
			text-align: center;
		}

		> div {
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
				font-size: 20px;
				line-height: 24px;
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

export const Share = styled.div`
	position: relative;

	.tooltip {
		position: absolute;
		width: 94px;
		height: 24px;
		background-color: ${({ theme }) => theme.colors.primary};
		position: absolute;
		bottom: -38px;
		right: 10px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		border-radius: 6px;
		border-top-right-radius: 0;

		font-size: 10px;
		font-weight: bold;
		line-height: 24px;
		text-align: center;
	}

	.tooltip:after {
		content: "";
		position: absolute;
		top: -10px;
		right: 0;
		border-left: 10px solid transparent;
		border-bottom: 10px solid ${({ theme }) => theme.colors.primary};
	}
`;

export default {};
