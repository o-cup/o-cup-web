import { format } from "date-fns";
import Link from "next/link";
import React, { memo } from "react";
import { BiasChip, Icon } from "../../shared/components";
import {
	convertDateWithDots,
	imageOnErrorHandler,
	isOpenToday,
} from "../../shared/utils";
import { StyledEvent } from "./styles/eventStyle";
import type { ResultType } from "./hooks/useSearchResult";

type EventProps = {
	event: ResultType;
};

const Event = ({ event }: EventProps) => {
	const {
		image,
		category,
		place,
		biasesId,
		snsId,
		districts,
		startAt,
		endAt,
		id,
	} = event;
	const today = format(new Date(), "yyyyMMdd");
	const isDuringEvent = isOpenToday(today, startAt!, endAt!);
	const isEnd = today > endAt!;
	const fileName = isEnd ? `${category}_disabled` : category;

	return (
		<Link href={`/detail/${id}`}>
			<StyledEvent isEnd={isEnd}>
				<div className="poster">
					<img alt={place} src={image} onError={imageOnErrorHandler} />
				</div>

				<div>
					<div className="title">
						<h2>{place}</h2>
						<img
							className="category_icon"
							alt={category}
							src={`/images/categories/${fileName}.svg`}
						/>
					</div>

					<div className="biases">
						{biasesId?.map((biasId) => (
							<BiasChip id={biasId} key={biasId} disabled={isEnd} />
						))}
					</div>

					<ul className="extraInfo">
						<li>
							<Icon name="host-gray" />
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
		</Link>
	);
};

export default memo(Event);
