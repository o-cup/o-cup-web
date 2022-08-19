import React from "react";
import { useRecoilState } from "recoil";
import { dateFilterAtom } from "../../../../state/atoms";
import { addZero, convertDateToString, convertStringToDate } from "../../../utils/dateHandlers";

type StateProps = {
  isCalendarOpen: boolean;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DateSelector({ isCalendarOpen, setCalendarOpen }: StateProps) {
  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom);

  const isToday = dateFilter === convertDateToString(new Date());
  const monthIndex = convertStringToDate(dateFilter).getMonth();
  const date = convertStringToDate(dateFilter).getDate();

  return (
    <div className="date_selector">
      <p>
        {isToday ? "오늘" : `${addZero(monthIndex + 1)}.${addZero(date)}`}
      </p>
      <button type="button" className={`calendarOpenButton ${isCalendarOpen ? "active" : ""}`}
              onClick={() => setCalendarOpen(!isCalendarOpen)}>
        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.07107 7.14236L14.1421 0.0712891H0L7.07107 7.14236Z" fill="black" />
        </svg>
      </button>
    </div>
  );
}

export default DateSelector;
