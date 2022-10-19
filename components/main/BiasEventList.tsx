import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { CategoryChip } from "../../shared/components";
import { dateFilterAtom } from "../../shared/state";
import {
	convertDateToString,
	convertStringToDate,
	isBeforeToday,
} from "../../shared/utils/dateHandlers";
import { CATEGORY_TYPES } from "../request/categoryInput";
import EventListItem from "./EventListItem";
import { StyledMainLists } from "./styles/mainEventListStyles";
import type { EventType, PeopleType } from "../../shared/types";

type BiasEventListProps = {
	id: string;
	bias: PeopleType;
	events: EventType[];
};

const BiasEventList = ({ id, bias, events }: BiasEventListProps) => {
	const dateFilter = useRecoilValue(dateFilterAtom);
	const [openedCategory, setOpenedCategory] = useState<
		("A" | "B" | "C" | "D" | "E")[]
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<
		("A" | "B" | "C" | "D" | "E")[]
	>([]);

	const isToday = dateFilter === convertDateToString(new Date());
	// const monthIndex = convertStringToDate(dateFilter).getMonth();
	const date = convertStringToDate(dateFilter).getDate();

	const getEventTitle = () =>
		`${isToday ? "오늘" : `${date}일에`} ${
			isBeforeToday(dateFilter) ? "열린" : "열리는"
		} ${bias.name} 이벤트`;

	/** 이벤트 존재하는 카테고리만 활성화 */
	useEffect(() => {
		const resultArr = [] as ("A" | "B" | "C" | "D" | "E")[];
		if (events) {
			events.forEach((event) => {
				resultArr.push(event.category);
			});
		}
		const resultSet = new Set(resultArr);
		setOpenedCategory(Array.from(resultSet));
	}, [events]);

	const handleClickCategory = (category: "A" | "B" | "C" | "D" | "E") => {
		if (selectedCategory.includes(category)) {
			const removeArr = selectedCategory.filter((cate) => cate !== category);
			setSelectedCategory(removeArr);
		} else {
			setSelectedCategory([...selectedCategory, category]);
		}
	};

	return (
		<div id={id}>
			<p>{getEventTitle()}</p>
			<ul className="category">
				{CATEGORY_TYPES.map((category) => (
					<li key={category}>
						<CategoryChip
							type={category}
							opacity={openedCategory?.includes(category) ? 1 : 0.4}
							disabled={!openedCategory?.includes(category)}
							selected={selectedCategory?.includes(category)}
							handleClick={() => handleClickCategory(category)}
						/>
					</li>
				))}
			</ul>
			<StyledMainLists>
				{selectedCategory.length === 0
					? events?.map((event) => (
							<EventListItem event={event} key={event.id} />
					  ))
					: events
							?.filter((event) => selectedCategory.includes(event.category))
							.map((event) => <EventListItem event={event} key={event.id} />)}
			</StyledMainLists>
		</div>
	);
};

export default BiasEventList;
