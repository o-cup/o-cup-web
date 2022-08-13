import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTwitter, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import { EventType } from "../../types";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";
import { StyledItem } from "./styles/mainStyle";
import BiasChip from "../../shared/components/BiasChip";

type EventListItemProps = {
	event: EventType;
};

const EventListItem = ({ event }: EventListItemProps) => {
	const navigate = useNavigate();
	const { id, place, images, biasesId, organizer, snsId, district, startAt, endAt } = event;

	return (
		<StyledItem onClick={() => navigate(`/detail/${id}`)}>
			<div>
				<img alt="sample" src={images[0]} />
			</div>
			<div>
				<h6>{place}</h6>
				<BiasChip id={biasesId[0]} key={biasesId[0]} dots={biasesId.length > 1}/>
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
				{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
			</p>
		</StyledItem>
	);
};

export default EventListItem;
