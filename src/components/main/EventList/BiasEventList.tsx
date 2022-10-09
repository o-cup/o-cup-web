import React, { useEffect, useState } from "react";
import { EventType } from "../../../types";
import EventListItem from "./EventListItem";
import { StyledMainLists } from "./mainEventListStyles";

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