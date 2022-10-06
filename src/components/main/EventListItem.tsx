import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EventType } from "../../types";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";
import { StyledItem } from "./styles/mainStyle";
import BiasChip from "../../shared/components/BiasChip";
import { Icon } from "../../shared/components";
import { imageOnErrorHandler } from "../../shared/utils/imageHandlers";

type EventListItemProps = {
	event: EventType;
};

const EventListItem = ({ event }: EventListItemProps) => {
	const navigate = useNavigate();
	const { id, place, images, biasesId, organizer, snsId, districts, startAt, endAt } = event;

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
				<p>{place}</p>
				<BiasChip id={biasesId[0]} key={biasesId[0]} dots={biasesId.length > 1} />
			</div>
			<ul className="textContainer">
				<li>
					<Icon name="host-gray" />
					<p>{organizer}</p>
				</li>
				<li>
					<FaTwitter />
					<p>{snsId ? `@${snsId}` : "-"}</p>
				</li>
				<li>
					<Icon name="place-gray" />
					<p>{districts.name}</p>
				</li>
				<li>
					<Icon name="calendar-gray" />
					<p>
						{startAt && convertDateWithDots(startAt)} - {endAt && convertDateWithDots(endAt)}
					</p>
				</li>
			</ul>
		</StyledItem>
	);
};

export default EventListItem;
