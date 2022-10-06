import React, { memo } from "react";
import { FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../shared/components";
import BiasChip from "../../shared/components/BiasChip";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { imageOnErrorHandler } from "../../shared/utils/imageHandlers";
import { EventType } from "../../types";
import { StyledEvent } from "./styles/eventStyle";

type EventProps = {
	event: Partial<EventType> & { image: string };
};

const Event = ({ event }: EventProps) => {
	const navigate = useNavigate();
	const { image, place, biasesId, organizer, snsId, newDistrict, startAt, endAt, id } = event;

	const today = convertDateToString(new Date());
	const isDuringEvent = isOpenToday(today, startAt!, endAt!);

	return (
		<StyledEvent onClick={() => navigate(`/detail/${id}`)}>
			<img alt={place} src={image} onError={imageOnErrorHandler} />
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
						<p>{newDistrict?.name}</p>
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
