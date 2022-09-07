import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EventType } from "../../types";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";
import { StyledItem } from "./styles/mainStyle";
import BiasChip from "../../shared/components/BiasChip";
import { DEFAULT_POSTER_URL } from "../../shared/constants";

type EventListItemProps = {
	event: EventType;
};

const EventListItem = ({ event }: EventListItemProps) => {
	const navigate = useNavigate();
	const { id, place, images, biasesId, organizer, snsId, district, startAt, endAt } = event;

	const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = DEFAULT_POSTER_URL;
		e.currentTarget.className = "error";
	};

	return (
		<StyledItem onClick={() => navigate(`/detail/${id}`)}>
			<div className="imgContainer">
				<LazyLoadImage
					wrapperClassName="lazy-image"
					alt={images[0]}
					src={images[0]}
					effect="blur"
					onError={imageOnErrorHandler}
				/>
			</div>
			<div className="title">
				<h6>{place}</h6>
				<BiasChip id={biasesId[0]} key={biasesId[0]} dots={biasesId.length > 1} />
			</div>
			<div className="textContainer">
				<p>
					<img src="/images/icons/host_gray.png" alt="host" />
					{organizer}
				</p>
				<p>
					<FaTwitter />@{snsId}
				</p>
				<p>
					<img src="/images/icons/place_gray.png" alt="place" />
					{district}
				</p>
				<p>
					<img src="/images/icons/calendar_gray.png" alt="calendar" />
					{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
				</p>
			</div>
		</StyledItem>
	);
};

export default EventListItem;
