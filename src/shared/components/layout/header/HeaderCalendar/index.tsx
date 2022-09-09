import React from "react";
import { Calendar as RCalendar } from "react-date-range-ts";
import { ko } from "date-fns/locale";
import "react-date-range-ts/dist/styles.css";
import "./header-calendar-custom.css";

import { useRecoilState } from "recoil";
import { biasFilterAtom, dateFilterAtom } from "../../../../../state/atoms";
import { convertDateToString, convertStringToDate } from "../../../../utils/dateHandlers";
import { StyledHeaderCalendarContainer } from "../headerStyle";

type StateProps = {
	setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function HeaderCalendar({ setCalendarOpen }: StateProps) {
	const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom);
	const [, setBiasFilter] = useRecoilState(biasFilterAtom);

	const handleChangeDate = (date: Date) => {
		setDateFilter(convertDateToString(date));
		setBiasFilter([] as number[]); // 선택 된 아티스트 필터 초기화
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
}

export default HeaderCalendar;
