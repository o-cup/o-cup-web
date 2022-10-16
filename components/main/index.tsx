import React from "react";
import { useRecoilState } from "recoil";
import Icons from "../../shared/components/icon";
import Layout from "../../shared/components/layout";
import { useClearData } from "../../shared/hooks";
import { dateFilterAtom } from "../../shared/state";
import { convertDateToString, convertStringToDate } from "../../shared/utils";
import BiasList from "./BiasList";
import EventSection from "./EventSection";
import { StyledMain } from "./styles/mainStyle";

const Main = () => {
	const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom);
	const isToday = dateFilter === convertDateToString(new Date());
	const monthIndex = convertStringToDate(dateFilter).getMonth();
	const date = convertStringToDate(dateFilter).getDate();

	useClearData();

	const handleChangeDate = (type: "prev" | "next") => {
		const selectedDate = convertStringToDate(dateFilter);
		const result = new Date(selectedDate);
		if (type === "prev") {
			result.setDate(result.getDate() - 1);
		}
		if (type === "next") {
			result.setDate(result.getDate() + 1);
		}
		setDateFilter(convertDateToString(result));
	};

	// useEffect(() => {
	// 	setMetaTags({});
	// 	return () => {
	// 		setMetaTags({});
	// 	};
	// }, []);

	return (
		<Layout page="main">
			<StyledMain>
				<div className="dateTitle">
					<Icons
						name="left-arrow-circle"
						handleClick={() => handleChangeDate("prev")}
					/>
					<p>{isToday ? "오늘" : `${monthIndex + 1}월 ${date}일`}의 이벤트</p>
					<Icons
						name="right-arrow-circle"
						handleClick={() => handleChangeDate("next")}
					/>
				</div>
				<BiasList />
				<EventSection />
			</StyledMain>
		</Layout>
	);
};

export default Main;
