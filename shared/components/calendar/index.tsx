import { ko } from "date-fns/locale";
import React from "react";
import { DateRange } from "react-date-range-ts";
import { convertDateToString, convertDateWithDots } from "../../utils";
import { StyledCalendar } from "./calendarStyle";
import type { DateRangeType } from "../../types";
import type { Dispatch, SetStateAction } from "react";

type CalendarProps = {
	selectedRange: DateRangeType;
	setSelectedRange: Dispatch<SetStateAction<DateRangeType>>;
};

const Calendar = ({ selectedRange, setSelectedRange }: CalendarProps) => {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const handleDateChange = (range: any) => {
		setSelectedRange(range.selection);
	};

	return (
		<StyledCalendar>
			<DateRange
				className="custom-calendar"
				editableDateInputs
				moveRangeOnFirstSelection={false}
				ranges={[selectedRange]}
				onChange={handleDateChange}
				locale={ko}
				showMonthAndYearPickers={false}
				showDateDisplay={false}
				minDate={new Date(2022, 7, 1)}
				monthDisplayFormat="yyyy.MMM"
				dateDisplayFormat="yyyy.MM.dd"
			/>
			<div className="dateCheckContainer">
				<div className="dateRange">
					<p>
						{convertDateWithDots(convertDateToString(selectedRange.startDate))}
					</p>
					~
					<p>
						{convertDateWithDots(convertDateToString(selectedRange.endDate))}
					</p>
				</div>
			</div>
		</StyledCalendar>
	);
};

export default Calendar;
