import React, { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";
import { StyledList } from "../../styles/eventListStyle";
import EventListItem from "./EventListItem";
import { fetchEvents } from "../../apis";
import { ITEMS_PER_PAGE } from "../../shared/constants";
import { keywordAtom } from "../../state/atoms";

const EventList = () => {
	const { ref, inView } = useInView();
	const keyword = useRecoilValue(keywordAtom);

	const {
		data: events,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery("events", () => fetchEvents({ infinite: true }), {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage && lastPage?.length < ITEMS_PER_PAGE) {
				return null;
			}
			return pages.length + 1;
		},
	});
	const { data: searchedEvents } = useQuery(["searchedEvents", keyword], () => fetchEvents({ keyword }));

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	// todo: flat()으로 리팩토링 또는 데이터 구조 변경
	return (
		<StyledList>
			{searchedEvents?.map((event) => <EventListItem event={event} key={event.id} />) ||
				events?.pages.map((page) =>
					page?.map((item) => (
						<div key={item.id} ref={ref}>
							<EventListItem event={item} key={item.id} />
						</div>
					))
				)}
		</StyledList>
	);
};
export default EventList;
