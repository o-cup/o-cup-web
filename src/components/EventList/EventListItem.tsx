import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTwitter, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
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
				<span>
					{bias[0]}
					{bias.length > 1 && "..."}
				</span>
			</div>
			<p>
				<FaUserCircle />
				{organizer}
			</p>
			<p>
				<FaTwitter />@{snsId}
			</p>
			<p>
				<FaMapMarkerAlt />
				{district}
			</p>
			<p>
				<FaCalendar />
				{startAt}-{endAt}
			</p>
		</StyledItem>
	);
};

export default EventListItem;
