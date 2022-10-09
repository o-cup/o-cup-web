import React from "react";
import EventListItem from "./EventListItem";
import { StyledMainLists } from "./styles/mainEventListStyles";
import type { EventType } from "../../shared/types";

type BiasEventListProps = {
	events: EventType[];
};
const BiasEventList = ({ events }: BiasEventListProps) => (
	<StyledMainLists>
		{events?.map((event) => (
			<EventListItem event={event} key={event.id} />
		))}
	</StyledMainLists>
);

export default BiasEventList;
