import React from "react";
import { ko } from "date-fns/locale";
import { DateRange } from "react-date-range-ts";
import { convertDateToString, convertDateWithDots } from "../../utils/dateHandlers";
import { StyledCalendar } from "./calendarStyle";

type CalendarProps = {
	selectedRange: any;
	handleSelectRange: any;
	handleClickSubmit: any;
};

const Calendar = ({ selectedRange, handleSelectRange, handleClickSubmit }: CalendarProps) => (
	<StyledCalendar>
		<DateRange
			className="request-calendar"
			editableDateInputs
			moveRangeOnFirstSelection={false}
			ranges={[selectedRange]}
			onChange={handleSelectRange}
			locale={ko}
			showMonthAndYearPickers={false}
			showDateDisplay={false}
			minDate={new Date(2022, 7, 1)}
			monthDisplayFormat="yyyy.MMM"
			dateDisplayFormat="yyyy.MM.dd"
		/>
		<div className="dateCheckContainer">
			<div className="dateRange">
				<p>{convertDateWithDots(convertDateToString(selectedRange.startDate))}</p>~
				<p>{convertDateWithDots(convertDateToString(selectedRange.endDate))}</p>
			</div>
			<button type="button" onClick={handleClickSubmit}>
				적용
			</button>
		</div>
	</StyledCalendar>
);

export default Calendar;
