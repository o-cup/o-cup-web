import { ko } from "date-fns/locale";
import React from "react";
import { Calendar as RCalendar } from "react-date-range-ts";

import { useRecoilState } from "recoil";
import { dateFilterAtom } from "../../../../state";
import { convertDateToString, convertStringToDate } from "../../../../utils";
import { StyledHeaderCalendarContainer } from "../style";

type StateProps = {
	setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderCalendar = ({ setCalendarOpen }: StateProps) => {
	const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom);

	const handleChangeDate = (date: Date) => {
		setDateFilter(convertDateToString(date));
		setCalendarOpen(false);
	};

	return (
		<StyledHeaderCalendarContainer>
			<RCalendar
				className="header-calendar"
				locale={ko}
				date={convertStringToDate(dateFilter)}
				onChange={handleChangeDate}
				showMonthAndYearPickers={false}
				showDateDisplay={false}
				minDate={new Date(2022, 7, 1)}
				monthDisplayFormat="yyyy.MMM"
				dateDisplayFormat="yyyy.MM.dd"
			/>
		</StyledHeaderCalendarContainer>
	);
};

export default HeaderCalendar;
