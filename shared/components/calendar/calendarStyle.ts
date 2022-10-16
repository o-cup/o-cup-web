import styled from "styled-components";
import { StyledCalendarContainer } from "../../../components/request/DateRange/dateRangeInputStyle";

export const StyledCalendar = styled(StyledCalendarContainer)`
	border: 0;

	& > div:first-child {
		width: fit-content;
		position: absolute;

		top: 17px;
		left: 15px;
		z-index: 1;
	}

	& > i.delete-circle-black {
		position: absolute;
		top: 14px;
		right: 15px;
		z-index: 1;
	}

	.rdrMonthAndYearPickers {
		font-size: 14px;
	}

	.dateCheckContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: ${({ theme }) => theme.colors.primary};
		padding: 14px 20px 14px 32px;
		font-size: 14px;

		.dateRange {
			width: 60%;
			display: flex;
			justify-content: space-around;

			> p {
				font-weight: 500;
				line-height: 17px;
				display: inline-block;
			}
		}

		> button {
			background: #000;
			border-radius: 16px;
			font-weight: 700;
			line-height: 16px;
			text-align: center;
			color: #ffffff;
			padding: 10px 20px;
		}
	}
`;

export default {};