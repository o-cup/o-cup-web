import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { StyledList } from "../../styles/eventListStyle";
import EventListItem from "./EventListItem";
import { Event } from "../../types";

const EventList = () => {
	const [events, setEvents] = useState<Event[]>([]);

	const getEvents = async () => {
		const { data, error } = await supabase.from("events");
		if (error) {
			throw error;
		}
		if (!data) return;
		setEvents(data);
	};

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<StyledList>
			{events.map((event) => (
				<EventListItem event={event} key={event.id} />
			))}
		</StyledList>
	);
};

export default EventList;
