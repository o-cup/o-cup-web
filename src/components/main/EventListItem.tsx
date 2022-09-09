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
import { Icon } from "../../shared/components";

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
		</StyledItem>
	);
};

export default EventListItem;
