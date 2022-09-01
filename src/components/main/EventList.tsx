import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchEvents } from "../../apis";
import { openedBiasAtom, dateFilterAtom, biasFilterAtom } from "../../state/atoms";
import EventListItem from "./EventListItem";
import { StyledList } from "./styles/mainStyle";
import EmptyDefault from "./EmptyDefault";

// todo: useInfiniteQuery 리팩토링 후 추가
const EventList = () => {
	const dateFilter = useRecoilValue(dateFilterAtom);
	const biasFilter = useRecoilValue(biasFilterAtom);
	const setOpenedBias = useSetRecoilState(openedBiasAtom);

	const { data: events } = useQuery(["events", dateFilter], () =>
		fetchEvents({
			date: dateFilter,
		})
	);

	const [biasFilteredEvents, setBiasFilteredEvents] = useState(events ? [...events] : []);

	/** 이벤트 목록에서 인물 id 추출 */
	useEffect(() => {
		const biasArr: number[] = [];
		if (events) {
			events.forEach((event) => biasArr.push(...event.biasesId));
		}
		const biasSet = new Set(biasArr);
		setOpenedBias(Array.from(biasSet));
	}, [events]);

	/** 이벤트 목록에 인물 필터 적용 */
	useEffect(() => {
		if (events && biasFilter) {
			if (biasFilter.length === 0) {
				setBiasFilteredEvents(events);
			} else {
				const filtered = events.filter((event) => event.biasesId.find((bias: number) => biasFilter.includes(bias)));
				setBiasFilteredEvents(filtered);
			}
		}
	}, [biasFilter, events]);

	return (
		<StyledList>
			{biasFilteredEvents?.map((event) => (
				<EventListItem event={event} key={event.id} />
			))}
      <EmptyDefault size={biasFilteredEvents.length > 0 ? "small" : "default"} />
		</StyledList>
	);
};
export default EventList;
