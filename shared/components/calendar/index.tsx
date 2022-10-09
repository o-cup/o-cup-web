import React, { Dispatch, SetStateAction } from "react";
import { ko } from "date-fns/locale";
import { DateRange } from "react-date-range-ts";
import { convertDateToString, convertDateWithDots } from "../../utils/dateHandlers";
import { StyledCalendar } from "./calendarStyle";
import Icon from "../Icon/Icons";
import { ResetModalBtn } from "../../../components/search/styles/searchStyle";
import { DateRangeType } from "../../../types";

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
		setSelectedRange({ startDate: new Date(), endDate: new Date(), key: "selection" });
	};

	return (
		<StyledCalendar>
			<ResetModalBtn onClick={handleClickReset}>
				<Icon name="reset" />
				<span>초기화</span>
			</ResetModalBtn>
			<Icon name="delete-circle-black" handleClick={() => setCalendarOpen(false)} />

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
};

export default Calendar;
