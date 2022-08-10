import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dateFilterAtom } from "../../state/atoms";
import { addZero, convertDateToString, convertStringToDate } from "../../shared/dateHandlers";

function DateSelector() {
  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom);
  const [selectedDate, setSelectedDate] = useState(convertStringToDate(dateFilter));

  const year = selectedDate.getFullYear();
  const monthIndex = selectedDate.getMonth();
  const date = selectedDate.getDate();

  function getPrevMonth() {
    const prev = new Date(year, monthIndex, date - 1);
    setSelectedDate(prev);
  }

  function getNextMonth() {
    const next = new Date(year, monthIndex, date + 1);
    setSelectedDate(next);
  }

  useEffect(() => {
    setDateFilter(convertDateToString(selectedDate));
  }, [selectedDate]);

  return (
    <div className="date_selector">
      <button type="button" onClick={getPrevMonth}>
        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.15493e-08 6L9 0.803848L9 11.1962L7.15493e-08 6Z" fill="#000000" />
        </svg>
      </button>
      <p>{year}.{addZero(monthIndex + 1)}.{addZero(date)}</p>
      <button type="button" onClick={getNextMonth}>
        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.15493e-08 6L9 0.803848L9 11.1962L7.15493e-08 6Z" fill="#000000" />
        </svg>
      </button>
    </div>
  );
}

export default DateSelector;
