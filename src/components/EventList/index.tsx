import React from "react";
import { useInfiniteQuery } from "react-query";
import { StyledList } from "../../styles/eventListStyle";
import EventListItem from "./EventListItem";
import { supabase } from "../../supabaseClient";

const ITEMS_PER_PAGE = 20;

const fetchEvents = async ({ pageParam = 1 }) => {
	const endAt = pageParam * ITEMS_PER_PAGE;
	const startAt = endAt - ITEMS_PER_PAGE === 0 ? endAt - ITEMS_PER_PAGE : endAt - ITEMS_PER_PAGE + 1;

	const { data } = await supabase.from("events").select("*").range(startAt, endAt);
	return data;
};

const EventList = () => {
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery("events", fetchEvents, {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage && lastPage?.length < ITEMS_PER_PAGE) {
				return null;
			}
			return pages.length + 1;
		},
	});

	// todo: flat()으로 리팩토링
	return (
		<StyledList>
			{data?.pages.map((page) => page?.map((item) => <EventListItem event={item} key={item.id} />))}
			<button type="button" disabled={!hasNextPage} onClick={() => fetchNextPage()}>
				더보기
			</button>
		</StyledList>
	);
};
export default EventList;
