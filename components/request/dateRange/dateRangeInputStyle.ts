import styled from "styled-components";

const StyledDateRangeInput = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;

	> .dateInputContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 6px;

		> span {
			font-weight: 400;
			font-size: 14px;
			line-height: 20px;
		}

		> div.disabledCalendarInput {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background: #e5e5e5;
			border: 2px solid #000000;
			border-radius: 4px;
			color: ${({ theme }) => theme.colors.gray};
			height: 48px;
			text-align: center;
			font-weight: 500;
			font-size: 14px;
			line-height: 17px;
		}

		> button.calendarOpenInput {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background: #ffffff;
			border: 2px solid #000000;
			border-radius: 4px;
			height: 48px;
			cursor: pointer;

			> input {
				width: 100%;
				outline: none;
				text-align: center;
				border-radius: 4px;
				font-weight: 500;
				font-size: 14px;
				line-height: 17px;

				&:disabled {
					background: #ffffff;
				}
			}

			> i#calendar {
				position: absolute;
				top: 50%;
				right: 16px;
				transform: translateY(-50%);
				display: inline-block;
				background: url("/images/icons/calendar.png") no-repeat;
				background-size: contain;
				height: 24px;
				width: 24px;
			}
		}
	}
`;

const StyledCalendarContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	gap: 6px;
	border: 2px solid #000000;
	border-radius: 4px;

	.dateCheckContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f9f368;
		padding: 14px 20px 14px 32px;

		> p {
			font-weight: 500;
			font-size: 14px;
			line-height: 17px;
		}

		> button {
			background: #000000;
			border-radius: 4px;
			font-weight: 700;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			color: #ffffff;
			padding: 10px 20px;
		}
	}

	.request-calendar {
		&.rdrCalendarWrapper {
			color: #000000;
			font-size: 12px;
			line-height: 16px;
			border-radius: 4px;
		}

		.rdrMonthAndYearWrapper {
			justify-content: center;
			align-items: center;
			height: 50px;
			background: ${({ theme }) => theme.colors.primary};
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
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
			border: 2px solid ${({ theme }) => theme.colors.black};
			border-radius: 100px;
			background: ${({ theme }) => theme.colors.white};
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

		.rdrMonths.rdrMonthsVertical .rdrMonth:first-child .rdrMonthName {
			display: none;
		}

		.rdrWeekDay {
			font-weight: 400;
			line-height: 3em;
			color: #000000;
		}

		.rdrDay {
			background: transparent;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border: 0;
			padding: 0;
			line-height: 36px;
			height: 36px;
			text-align: center;
			color: #000000;
			font-weight: 300;
			position: relative;
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
			bottom: 4px;
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

		/* 선택 된 날짜 배경 옅은 노랑 컬러 */
		.rdrSelected,
		.rdrInRange,
		.rdrStartEdge,
		.rdrEndEdge {
			background: rgba(249, 243, 104, 0.5);
			position: absolute;
			width: 100%;
			height: 32px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		/* 선택 된 첫 날짜 좌측 배경컬러 지우기 */
		.rdrStartEdge {
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
			background-image: linear-gradient(to right, white 50%, transparent 50%);
		}

		/* 선택 된 마지막 날짜 우측 배경컬러 지우기 */
		.rdrEndEdge {
			border-top-right-radius: 100px;
			border-bottom-right-radius: 100px;
			background-image: linear-gradient(to left, white 50%, transparent 50%);
		}

		/* 날짜 하나만 선택 되었을 경우(시작하는 날이면서 마지막 날) 배경컬러 전부 지우기 */
		.rdrStartEdge.rdrEndEdge {
			background-image: linear-gradient(to right, white 50%, white 50%);
		}

		/* 첫 날짜, 마지막 날짜 원 표시 */
		.rdrStartEdge:after,
		.rdrEndEdge:after {
			content: "";
			display: inline-block;
			width: 32px;
			height: 32px;
			background: #f9f368;
			border: 1px solid #000000;
			border-radius: 100px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.rdrSelected {
			border-radius: 1.042em;
		}

		.rdrDayStartOfMonth .rdrInRange,
		.rdrDayStartOfMonth .rdrEndEdge,
		.rdrDayStartOfWeek .rdrInRange,
		.rdrDayStartOfWeek .rdrEndEdge {
			border-top-left-radius: 1.042em;
			border-bottom-left-radius: 1.042em;
		}

		.rdrDayEndOfMonth .rdrInRange,
		.rdrDayEndOfMonth .rdrStartEdge,
		.rdrDayEndOfWeek .rdrInRange,
		.rdrDayEndOfWeek .rdrStartEdge {
			border-top-right-radius: 1.042em;
			border-bottom-right-radius: 1.042em;
		}

		.rdrCalendarWrapper:not(.rdrDateRangeWrapper)
			.rdrDayHovered
			.rdrDayNumber:after {
			content: "";
			border: 1px solid #f9f368;
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

export { StyledDateRangeInput, StyledCalendarContainer };
export default {};
