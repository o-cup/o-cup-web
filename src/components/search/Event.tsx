import React, { memo } from "react";
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
					{isDuringEvent && <i />}
				</div>

				<div className="biases">
					{biasesId?.map((biasId) => (
						<BiasChip id={biasId} key={biasId} />
					))}
				</div>

				<ul className="extraInfo">
					<li>
						<Icon name="host-gray" />
						<p>{organizer}</p>
					</li>
					<li>
						<FaTwitter />
						<p>@{snsId}</p>
					</li>
					<li>
						<Icon name="place-gray" />
						<p>{district}</p>
					</li>
					<li>
						<Icon name="calendar-gray" />
						<p>
							{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
						</p>
					</li>
				</ul>
			</div>
		</StyledEvent>
	);
};

export default memo(Event);
