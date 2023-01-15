import Link from "next/link";
import React from "react";
import Icon from "../../shared/components/icon";
import { convertDateWithDots, imageOnErrorHandler } from "../../shared/utils";
import {
	StyledMainListItem,
	StyledCategoryBorder,
} from "./styles/mainEventListStyles";
import type { EventType } from "../../shared/types";

type EventListItemProps = {
	event: EventType;
};

const EventListItem = ({ event }: EventListItemProps) => {
	const { id, place, image, category, snsId, districts, startAt, endAt } =
		event;

	return (
		<Link href={`/detail/${id}`}>
			<StyledMainListItem>
				<StyledCategoryBorder type={category} />
				<div className="imgContainer">
					<img alt={image} src={image} onError={imageOnErrorHandler} />
				</div>
				<div className="title">
					<p>{place}</p>
					{/* <BiasChip id={biasesId[0]} key={biasesId[0]} dots={biasesId.length > 1} /> */}
				</div>
				<ul className="textContainer">
					<li>
						<Icon name="host-gray" />
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
		</Link>
	);
};

export default EventListItem;
