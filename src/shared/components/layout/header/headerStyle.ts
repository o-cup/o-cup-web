import styled from "styled-components";

export const StyledHeader = styled.header<{ mainPage: boolean }>`
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	z-index: ${({ theme }) => theme.zIndex.header};
	background: rgba(252, 251, 247, 0.9);
	backdrop-filter: blur(4px);

	max-width: 100vw;
	max-width: ${({ theme }) => theme.widths.layout};

	> div#header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: ${({ theme }) => theme.heights.header};
		padding: 5px 20px;
		position: relative;

		max-width: 900px;
		width: 100%;

		position: relative;

		h1 {
			font-size: 18px;
			font-weight: bold;
			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: fit-content;
		}

		> div.rightIcons {
			display: flex;
			height: 100%;
			align-items: center;
			gap: 18px;
		}

		i.search_header {
			width: 20px;
			height: 20px;
		}
	}
`;

export const StyledDateSelector = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;

	> p {
		text-align: center;
		font-weight: 700;
		font-size: 18px;
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
`;

export const StyledHeaderCalendarContainer = styled.div`
	background: rgba(252, 251, 247, 0.9);
	z-index: ${({ theme }) => theme.zIndex.header};

	position: fixed;

	width: 100%;
	min-width: 320px;
	max-width: 1080px;
	top: ${({ theme }) => theme.heights.header};
	left: 0;

	backdrop-filter: blur(4px);

	/* @media ${({ theme }) => theme.device.desktop} {
		position: absolute;

		width: 360px;
		right: 0;
		top: 50px;

		backdrop-filter: blur(20px);
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

		padding-top: 10px;
	} */
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
