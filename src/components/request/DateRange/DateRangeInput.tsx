import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range-ts";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../state/atoms";
import "react-date-range-ts/dist/styles.css";
import "./request-calendar-custom.css";
import { StyledDateRangeInput, StyledCalendarContainer } from "./dateRangeInputStyle";
import { convertDateToString, convertDateWithDots, convertStringToDate } from "../../../shared/utils/dateHandlers";

const DateRangeInput = () => {
	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
  const { dateRange } = requestInputs;

	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const [selectedRange, setSelectedRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	useEffect(() => {
		setSelectedRange({
			startDate: dateRange.startAt ? convertStringToDate(dateRange.startAt) : new Date(),
			endDate: dateRange.endAt ? convertStringToDate(dateRange.endAt) : new Date(),
			key: "selection",
		});
	}, [dateRange]);

	const handleSelectRange = (ranges: any) => {
		setSelectedRange(ranges.selection);
	};

	const handleClickSubmit = () => {
    setRequestInputs({
      ...requestInputs,
      dateRange: {
        startAt: convertDateToString(selectedRange.startDate),
        endAt: convertDateToString(selectedRange.endDate),
      },
    });
		setCalendarOpen(false);
	};

	return (
		<StyledDateRangeInput>
			<div className="dateInputContainer">
				<span>이벤트 기간 *</span>
				<button type="button" className="calendarOpenInput" onClick={() => setCalendarOpen(!isCalendarOpen)}>
					<input
						disabled
						id="dateRange"
						type="text"
						placeholder="날짜 선택하기"
						value={
							dateRange.startAt && dateRange.endAt
								? `${convertDateWithDots(dateRange.startAt)} - ${convertDateWithDots(dateRange.endAt)}`
								: ""
						}
					/>
					<i id="calendar" />
				</button>
			</div>

			{isCalendarOpen && (
				<StyledCalendarContainer>
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
						<p>
							{convertDateWithDots(convertDateToString(selectedRange.startDate))} -{" "}
							{convertDateWithDots(convertDateToString(selectedRange.endDate))}
						</p>
						<button type="button" onClick={handleClickSubmit}>
							적용
						</button>
					</div>
				</StyledCalendarContainer>
			)}
		</StyledDateRangeInput>
	);
};

export default DateRangeInput;
