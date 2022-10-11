import { useRouter } from "next/router";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
import BiasChip from "../../shared/components/biasChip";
import Icon from "../../shared/components/icon";
import { convertDateWithDots, imageOnErrorHandler } from "../../shared/utils";
import { StyledMainListItem } from "./styles/mainEventListStyles";
import type { EventType } from "../../shared/types";

type EventListItemProps = {
	event: EventType;
};

const EventListItem = ({ event }: EventListItemProps) => {
	const router = useRouter();

	const {
		id,
		place,
		images,
		biasesId,
		organizer,
		snsId,
		districts,
		startAt,
		endAt,
	} = event;

	return (
		<StyledMainListItem onClick={() => router.push(`/detail/${id}`)}>
			<div className="imgContainer">
				<img alt={images[0]} src={images[0]} onError={imageOnErrorHandler} />
			</div>
			<div className="title">
				<p>{place}</p>
				<BiasChip
					id={biasesId[0]}
					key={biasesId[0]}
					dots={biasesId.length > 1}
				/>
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
						{startAt && convertDateWithDots(startAt)} -{" "}
						{endAt && convertDateWithDots(endAt)}
					</p>
				</li>
			</ul>
		</StyledMainListItem>
	);
};

export default EventListItem;
