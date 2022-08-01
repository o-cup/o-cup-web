import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { monthState } from "../../state/atoms";

function DateSelector() {
  const [month, setMonth] = useRecoilState(monthState);

	const today = new Date();

	const [selectedDate, setSelectedDate] = useState(today);

	const year = selectedDate.getFullYear();

  function getPrevMonth() {
    const prev = new Date(year, selectedDate.getMonth() - 1, 1);
    setSelectedDate(prev);
  }

	function getNextMonth() {
		const next = new Date(year, selectedDate.getMonth() + 1, 1)
		setSelectedDate(next)
	}

  useEffect(() => {
    const newMonth: number = selectedDate.getMonth() + 1;
    const currentMonthString: string = newMonth < 10 ? `0${newMonth}` : `${newMonth}`;
    setMonth(currentMonthString);
  }, [selectedDate]);

	return (
		<div className="date_selector">
			<button type="button" onClick={getPrevMonth}>
				<svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.15493e-08 6L9 0.803848L9 11.1962L7.15493e-08 6Z" fill="#000000" />
				</svg>
			</button>
			<p>{year}.{month}</p>
			<button type="button" onClick={getNextMonth}>
				<svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.15493e-08 6L9 0.803848L9 11.1962L7.15493e-08 6Z" fill="#000000" />
				</svg>
			</button>
		</div>
	);
}

export default DateSelector;
