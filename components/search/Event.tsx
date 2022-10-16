import { useRouter } from "next/router";
import React, { memo } from "react";
import { FaTwitter } from "react-icons/fa";
import { BiasChip, Icon } from "../../shared/components";
import {
	convertDateToString,
	convertDateWithDots,
	imageOnErrorHandler,
	isOpenToday,
} from "../../shared/utils";
import { StyledEvent } from "./styles/eventStyle";
import type { EventType } from "../../shared/types";

type EventProps = {
	event: Partial<EventType> & { image: string };
};

const Event = ({ event }: EventProps) => {
	const router = useRouter();
	const {
		image,
		category,
		place,
		biasesId,
		organizer,
		snsId,
		districts,
		startAt,
		endAt,
		id,
	} = event;

	const today = convertDateToString(new Date());
	const isDuringEvent = isOpenToday(today, startAt!, endAt!);

	return (
		<StyledEvent onClick={() => router.push(`/detail/${id}`)}>
			<img alt={place} src={image} onError={imageOnErrorHandler} />
			<div>
				<div className="title">
					<h2>{place}</h2>
					<img
						className="category_icon"
						alt={category}
						src={`/images/categories/${category}.png`}
					/>
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
						<p>@{snsId || "-"}</p>
					</li>
					<li>
						<Icon name="place-gray" />
						<p>{districts?.name}</p>
					</li>
					<li>
						<Icon name="calendar-gray" />
						<p>
							{startAt && convertDateWithDots(startAt)} -{" "}
							{endAt && convertDateWithDots(endAt)}
							{isDuringEvent && <i className="event_day" />}
						</p>
					</li>
				</ul>
			</div>
		</StyledEvent>
	);
};

export default memo(Event);
