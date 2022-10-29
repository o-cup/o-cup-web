import styled from "styled-components";
import { StyledCalendarContainer } from "../../../components/request/dateRange/dateRangeInputStyle";

export const StyledCalendar = styled(StyledCalendarContainer)`
	border: 0;

	.request-calendar .rdrMonthAndYearWrapper {
		background: ${({ theme }) => theme.colors.background};
	}

	.rdrMonthAndYearPickers {
		font-size: 14px;
		min-width: 70px;
	}

	.rdrWeekDays {
		height: 37px;
	}

	.rdrMonth {
		padding: 0px 5px !important;
		background: ${({ theme }) => theme.colors.background};
	}

	.dateCheckContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		background-color: ${({ theme }) => theme.colors.softPrimary};
		height: 64px;

		.dateRange {
			width: 60%;
			display: flex;
			justify-content: space-around;

			> p {
				font-weight: bold;
				line-height: 17px;
				display: inline-block;
			}
		}
	}
`;

export default {};
