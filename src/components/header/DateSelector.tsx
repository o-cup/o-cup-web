import React, { useState } from "react";

function DateSeletor() {

	const today = new Date();

	const [selectedDate, setSelectedDate] = useState(today);

	const year = selectedDate.getFullYear();

	const getMonthString = (month: number): string => {
		if (month < 10) {
			return `0${month}`;
		}
		return `${month}`;
	}
	const month = getMonthString(selectedDate.getMonth() + 1);

	function getPrevMonth() {
		const prev = new Date(year, selectedDate.getMonth() - 1, 1)
		setSelectedDate(prev)
	}

	function getNextMonth() {
		const next = new Date(year, selectedDate.getMonth() + 1, 1)
		setSelectedDate(next)
	}


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

export default DateSeletor;
