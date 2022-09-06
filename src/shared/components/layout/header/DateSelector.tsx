import React from "react";
import { useRecoilValue } from "recoil";
import { dateFilterAtom } from "../../../../state/atoms";
import { addZero, convertDateToString, convertStringToDate } from "../../../utils/dateHandlers";
import { StyledDateSelector } from "./headerStyle";

type StateProps = {
  isCalendarOpen: boolean;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DateSelector({ isCalendarOpen, setCalendarOpen }: StateProps) {
  const dateFilter = useRecoilValue(dateFilterAtom);

  const isToday = dateFilter === convertDateToString(new Date());
  const monthIndex = convertStringToDate(dateFilter).getMonth();
  const date = convertStringToDate(dateFilter).getDate();

  return (
    <StyledDateSelector onClick={() => setCalendarOpen(!isCalendarOpen)}>
      <p>
        {isToday ? "오늘" : `${addZero(monthIndex + 1)}.${addZero(date)}`}
      </p>
      <button type="button" className={`calendarOpenButton ${isCalendarOpen ? "active" : ""}`}>
        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.07107 7.14236L14.1421 0.0712891H0L7.07107 7.14236Z" fill="black" />
        </svg>
      </button>
    </StyledDateSelector>
  );
}

export default DateSelector;
