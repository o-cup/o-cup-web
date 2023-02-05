import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "../../shared/components/icon";
import { convertDateWithDots } from "../../shared/utils";
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

	if (!image) return null;

	return (
		<Link href={`/detail/${id}`}>
			<StyledMainListItem>
				<StyledCategoryBorder type={category} />
				<div className="imgContainer">
					<Image
						src={image}
						alt="poster"
						width={176}
						height={235}
						layout="intrinsic"
					/>
				</div>
				<div className="title">
					<p>{place}</p>
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
