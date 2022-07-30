import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { StyledList } from "../../styles/eventListStyle";
import EventListItem from "./EventListItem";
import { fetchEvents } from "../../apis";
import { ITEMS_PER_PAGE } from "../../shared/constants";

const EventList = () => {
	const { ref, inView } = useInView();
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery("events", fetchEvents, {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage && lastPage?.length < ITEMS_PER_PAGE) {
				return null;
			}
			return pages.length + 1;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	// todo: flat()으로 리팩토링 또는 데이터 구조 변경
	return (
		<StyledList>
			{data?.pages.map((page) =>
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
