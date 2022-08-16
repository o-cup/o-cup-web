import React, { useState } from "react";
import { DateRange } from "react-date-range-ts";
import { ko } from "date-fns/locale";

import "react-date-range-ts/dist/styles.css";
import "./styles/react-date-range-custom.css";
import { StyledDateRangeInput, StyledCalendarContainer } from "./dateRangeInputStyle";

const DateRangeInput = () => {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });

  const handleSelectRange = (ranges: any) => {
    console.log(ranges);
    setState(ranges.selection);
  };

  return (
    <StyledDateRangeInput>
      <StyledCalendarContainer>
        <DateRange
          editableDateInputs
          moveRangeOnFirstSelection={false}
          ranges={[state]}
          onChange={handleSelectRange}
          locale={ko}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          minDate={new Date(2022, 7, 1)}
          monthDisplayFormat="yyyy.MMM"
          dateDisplayFormat="yyyy.MM.dd"
        />
      </StyledCalendarContainer>
    </StyledDateRangeInput>
  );
};

export default DateRangeInput;
