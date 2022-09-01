import React from "react";
import { FaCalendar, FaMapMarkerAlt, FaTwitter, FaUserCircle } from "react-icons/fa";
import BiasChip from "../../shared/components/BiasChip";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";
import { EventType } from "../../types";
import { StyledEvent } from "./styles/eventStyle";

type EventProps = {
	event: EventType;
};

const Event = ({ event }: EventProps) => {
	const { images, place, biasesId, organizer, snsId, district, startAt, endAt } = event;

	return (
		<StyledEvent>
			<img src={images[0]} alt={place} />
			<div>
				<h2>{place}</h2>
				{biasesId?.map((biasId) => (
					<BiasChip id={biasId} key={biasId} />
				))}

				<div className="extraInfo">
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
				</div>
			</div>
		</StyledEvent>
	);
};

export default Event;
