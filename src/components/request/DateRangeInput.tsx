import React, { useState } from "react";
import { DateRange } from "react-date-range-ts";
import { ko } from "date-fns/locale";
import "react-date-range-ts/dist/styles.css";
import "./styles/request-calendar-custom.css";

import { StyledDateRangeInput, StyledCalendarContainer } from "./styles/dateRangeInputStyle";
import { convertDateToString, convertDateWithDots, convertStringToDate } from "../../shared/utils/dateHandlers";

type DateRangeValues = {
  startAt: string;
  endAt: string;
}

type InputProps = {
  value: DateRangeValues;
  setValue: React.Dispatch<React.SetStateAction<DateRangeValues>>;
};

const DateRangeInput = ({ value, setValue }: InputProps) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: value.startAt ? convertStringToDate(value.startAt) : new Date(),
    endDate: value.endAt ? convertStringToDate(value.endAt) : new Date(),
    key: "selection"
  });

  const handleSelectRange = (ranges: any) => {
    setSelectedRange(ranges.selection);
  };

  const handleClickSubmit = () => {
    setValue({
      startAt: convertDateToString(selectedRange.startDate),
      endAt: convertDateToString(selectedRange.endDate)
    });
    setCalendarOpen(false);
  };

  return (
    <StyledDateRangeInput>
      <div className="dateInputContainer">
        <span>이벤트 기간</span>
        <div className="inputWrapper">
          <input disabled id="dateRange" type="text" placeholder="날짜 선택하기"
                 value={(value.startAt && value.endAt) ? `${convertDateWithDots(value.startAt)} - ${convertDateWithDots(value.endAt)}` : ""} />
          <button id="calendar" type="button" onClick={() => setCalendarOpen(!isCalendarOpen)} />
        </div>
      </div>

      {isCalendarOpen && <StyledCalendarContainer>
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
          <p>{convertDateWithDots(convertDateToString(selectedRange.startDate))} - {convertDateWithDots(convertDateToString(selectedRange.endDate))}</p>
          <button type="button" onClick={handleClickSubmit}>적용</button>
        </div>
      </StyledCalendarContainer>}
    </StyledDateRangeInput>
  );
};

export default DateRangeInput;
