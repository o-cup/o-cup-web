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

		img.search {
			width: 24px;
			height: 24px;
			cursor: pointer;
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
	max-width: 480px;
	top: ${({ theme }) => theme.heights.header};
	left: 50%;
	transform: translateX(-50%);

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

	.header-calendar {
		&.rdrCalendarWrapper {
			color: #000000;
			font-size: 12px;
			width: 100%;
			background-color: transparent;
		}

		.rdrMonthAndYearWrapper {
			justify-content: center;
			align-items: center;
			height: 48px;
			/* padding-top: 10px; */
		}

		.rdrMonthAndYearPickers {
			font-weight: 600;
			flex: 0 1 auto;
			width: 64px;
		}

		.rdrNextPrevButton {
			display: block;
			width: 18px;
			height: 18px;
			margin: 0 0.833em;
			padding: 0;
			border: 2px solid #000000;
			border-radius: 100px;
			background: #ffffff;
		}

		.rdrNextPrevButton i {
			display: block;
			width: 0;
			height: 0;
			padding: 0;
			text-align: center;
			border-style: solid;
			margin: auto;
			transform: translate(-3px, 0px);
		}

		.rdrPprevButton i {
			border-width: 4px 6px 4px 4px;
			border-color: transparent #000000 transparent transparent;
			transform: translate(-3px, 0px);
		}

		.rdrNextButton i {
			margin: 0 0 0 2px;
			border-width: 4px 4px 4px 6px;
			border-color: transparent transparent transparent #000000;
			transform: translate(3px, 0px);
		}

		.rdrWeekDays {
			padding: 0 0.833em;
		}
		.rdrMonth {
			padding: 0 0.833em 1.666em 0.833em;
		}
		.rdrMonth .rdrWeekDays {
			padding: 0;
		}
		.rdrWeekDay {
			font-weight: 400;
			line-height: 48px;
			color: #000000;
			height: 48px;
		}
		.rdrDay {
			background: transparent;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border: 0;
			padding: 0;
			line-height: 48px;
			height: 48px;
			text-align: center;
			color: #000000;
			font-weight: 300;
		}
		.rdrDay:focus {
			outline: 0;
		}
		.rdrDayNumber {
			outline: 0;
			font-weight: 300;
			position: absolute;
			left: 0;
			right: 0;
			top: 5px;
			bottom: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.rdrDayToday .rdrDayNumber span {
			font-weight: 500;
		}
		.rdrDayToday .rdrDayNumber span:after {
			content: "";
			position: absolute;
			bottom: 8px;
			left: 50%;
			transform: translate(-50%, 0);
			width: 16px;
			height: 2px;
			border-radius: 2px;
			background: #7adfbb;
		}
		.rdrDayToday:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span:after,
		.rdrDayToday:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span:after,
		.rdrDayToday:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span:after,
		.rdrDayToday:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span:after {
			background: #fff;
		}

		.rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,
		.rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,
		.rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span,
		.rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span {
			/*color: rgba(255, 255, 255, 0.85);*/
			font-weight: 500;
		}
		.rdrSelected {
			/*background: rgba(249, 243, 104, 0.5);*/
			position: absolute;
			top: 5px;
			bottom: 5px;
			left: 4px;
			right: 4px;
			border-radius: 1.042em;
		}
		.rdrSelected:after {
			content: "";
			display: inline-block;
			width: 36px;
			height: 36px;
			background: #f9f368;
			border: 1px solid #000000;
			border-radius: 100px;
		}

		.rdrCalendarWrapper:not(.rdrDateRangeWrapper)
			.rdrDayHovered
			.rdrDayNumber:after {
			content: "";
			border: 1px solid currentColor;
			border-radius: 1.333em;
			position: absolute;
			top: -2px;
			bottom: -2px;
			left: 0px;
			right: 0px;
			background: transparent;
		}

		.rdrDayPassive {
			pointer-events: none;
		}
		.rdrDayPassive .rdrDayNumber span {
			color: #7a7a7a;
		}

		.rdrDayPassive .rdrInRange,
		.rdrDayPassive .rdrStartEdge,
		.rdrDayPassive .rdrEndEdge,
		.rdrDayPassive .rdrSelected,
		.rdrDayPassive .rdrDayStartPreview,
		.rdrDayPassive .rdrDayInPreview,
		.rdrDayPassive .rdrDayEndPreview {
			display: none;
		}
		.rdrDayDisabled {
			/*background-color: rgb(248, 248, 248);*/
		}

		.rdrDayDisabled .rdrDayNumber span {
			color: #c4c4c4;
		}

		.rdrDayDisabled .rdrInRange,
		.rdrDayDisabled .rdrStartEdge,
		.rdrDayDisabled .rdrEndEdge,
		.rdrDayDisabled .rdrSelected,
		.rdrDayDisabled .rdrDayStartPreview,
		.rdrDayDisabled .rdrDayInPreview,
		.rdrDayDisabled .rdrDayEndPreview {
			filter: grayscale(100%) opacity(60%);
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
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
			rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
