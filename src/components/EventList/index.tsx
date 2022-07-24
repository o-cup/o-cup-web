import React from "react";
import { useQuery } from "react-query";
import { StyledList } from "../../styles/eventListStyle";
import EventListItem from "./EventListItem";
import { getEvents } from "../../apis";

const EventList = () => {
	const { data: events } = useQuery("events", getEvents);

	return (
		<StyledList>
			{events?.map((event) => (
				<EventListItem event={event} key={event.id} />
			))}
		</StyledList>
	);
};
export default EventList;
