import React from "react";
import { FaCalendar, FaMapMarkerAlt, FaTwitter, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../shared/components";
import BiasChip from "../../shared/components/BiasChip";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { EventType } from "../../types";
import { StyledEvent } from "./styles/eventStyle";

type EventProps = {
	event: EventType;
};

const Event = ({ event }: EventProps) => {
	const navigate = useNavigate();
	const { images, place, biasesId, organizer, snsId, district, startAt, endAt, id } = event;

	const today = convertDateToString(new Date());
	const isDuringEvent = isOpenToday(today, startAt, endAt);

	return (
		<StyledEvent onClick={() => navigate(`/detail/${id}`)}>
			<img src={images[0]} alt={place} />
			<div>
				<div className="title">
					<h2>{place}</h2>
					{isDuringEvent && <span />}
				</div>

				<div className="biases">
					{biasesId?.map((biasId) => (
						<BiasChip id={biasId} key={biasId} />
					))}
				</div>

				<div className="extraInfo">
					<p>
						<Icon name="host-gray" />
						{organizer}
					</p>
					<p>
						<FaTwitter />@{snsId}
					</p>
					<p>
						<Icon name="place-gray" />
						{district}
					</p>
					<p>
						<Icon name="calendar-gray" />
						{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
					</p>
				</div>
			</div>
		</StyledEvent>
	);
};

export default Event;
