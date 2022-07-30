import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StyledEventNearHere } from "../../styles/eventNearHereStyle";
import EventNearHereList from "./EventNearHereLIst";
import { fetchEvents } from "../../apis";
import { EventType } from "../../types";

function EventNearHere({ bias, district }: Partial<EventType>) {
	const { id } = useParams();

	const { data: nearEvent } = useQuery(["event", id], fetchEvents, {
		enabled: !!id,
		select: (data) =>
			data?.filter((item) => {
				if (bias && bias[0]) {
					return item.id !== id && item.district === district && item.bias[0] === bias[0];
				}
				return null;
			}),
	});

	if (!nearEvent || nearEvent.length === 0) {
		return null;
	}

	return (
		<StyledEventNearHere>
			<h4>가까운 연관 이벤트</h4>
			<ul>
				{nearEvent &&
					nearEvent.map((event) => (
						<EventNearHereList
							id={event.id}
							key={event.id}
							images={event.images}
							place={event.place}
							organizer={event.organizer}
						/>
					))}
			</ul>
		</StyledEventNearHere>
	);
}

export default EventNearHere;
