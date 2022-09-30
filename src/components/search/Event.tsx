import React, { memo } from "react";
import { FaTwitter } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../shared/components";
import BiasChip from "../../shared/components/BiasChip";
import { DEFAULT_POSTER_URL } from "../../shared/constants";
import { convertDateToString, convertDateWithDots, isOpenToday } from "../../shared/utils/dateHandlers";
import { EventType } from "../../types";
import { StyledEvent } from "./styles/eventStyle";

type EventProps = {
	event: Partial<EventType> & { image: string };
};

const Event = ({ event }: EventProps) => {
	const navigate = useNavigate();
	const { image, place, biasesId, organizer, snsId, district, startAt, endAt, id } = event;

	const today = convertDateToString(new Date());
	const isDuringEvent = isOpenToday(today, startAt!, endAt!);

	const handleImgLoadError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = DEFAULT_POSTER_URL;
		e.currentTarget.className = "error";
	};

	return (
		<StyledEvent onClick={() => navigate(`/detail/${id}`)}>
			<LazyLoadImage wrapperClassName="lazy-image" alt={place} src={image} effect="blur" onError={handleImgLoadError} />
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
