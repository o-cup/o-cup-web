import { ko } from "date-fns/locale";
import React from "react";
import { DateRange } from "react-date-range-ts";
import { ResetButton } from "../../../components/search/styles/searchStyle";
import { convertDateToString, convertDateWithDots } from "../../utils";
import Icon from "../icon";
import { StyledCalendar } from "./calendarStyle";
import type { DateRangeType } from "../../types";
import type { Dispatch, SetStateAction } from "react";

type CalendarProps = {
	selectedRange: any;
	handleSelectRange: any;
	handleClickSubmit: any;
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setSelectedRange: Dispatch<SetStateAction<DateRangeType>>;
};

const Calendar = ({
	selectedRange,
	handleSelectRange,
	handleClickSubmit,
	setCalendarOpen,
	setSelectedRange,
}: CalendarProps) => {
	const handleClickReset = () => {
		setSelectedRange({
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		});
	};

	return (
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
