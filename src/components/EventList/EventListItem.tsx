import React from "react";
import { BiUserCircle, BiMap } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StyledItem } from "../../styles/eventListStyle";
import { EventType } from "../../types";

type EventListItemProps = {
	event: EventType;
};

const EventListItem = ({ event }: EventListItemProps) => {
	const navigate = useNavigate();

	const { id, place, images, bias, organizer, snsId, district, startAt, endAt } = event;

	return (
		<StyledItem onClick={() => navigate(`/detail/${id}`)}>
			<div>
				<img alt="sample" src={images[0]} />
			</div>
			<div>
				<h6>{place}</h6>
				<span>{bias[0]}</span>
			</div>
			<p>
				<BiUserCircle />
				{organizer} {snsId}
			</p>
			<p>
				<BiMap />
				{district}
			</p>
			<p>
				<FiCalendar />
				{startAt}-{endAt}
			</p>
		</StyledItem>
	);
};

export default EventListItem;
