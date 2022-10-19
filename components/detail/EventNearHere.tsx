import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { fetchEvents } from "../../shared/apis/common";
import { imageOnErrorHandler } from "../../shared/utils";
import {
	EventNearHereList,
	StyledEventNearHere,
} from "./styles/eventNearHereStyle";
import type { EventType } from "../../shared/types";

function EventNearHere({ biasesId, districts }: Partial<EventType>) {
	const router = useRouter();
	const { eid } = router.query;

	const { data: nearEvent } = useQuery(["event", eid], fetchEvents, {
		enabled: !!eid,
		select: (data) =>
			data?.filter((item) => {
				if (biasesId && biasesId[0]) {
					return (
						item.id !== eid &&
						item.districts.name === districts?.name &&
						item.biasesId[0] === biasesId[0]
					);
				}
				return null;
			}),
	});

	if (!nearEvent || nearEvent.length === 0) {
		return null;
	}

	return (
		<StyledEventNearHere>
			<p className="title">{districts?.name || "가까운"} 연관 이벤트</p>
			<ul>
				{nearEvent &&
					nearEvent.map((event) => {
						const { id: eventId, category, images, place, organizer } = event;
						const previewUrl = (images && images[0]) || "";
						return (
							<EventNearHereList
								key={eventId}
								onClick={() => router.push(`/detail/${eventId}`)}
							>
								{previewUrl && (
									<img
										alt={previewUrl}
										src={previewUrl}
										onError={imageOnErrorHandler}
									/>
								)}
								<div>
									<div className="near_title">
										<img
											alt={category}
											src={`/images/categories/${category}.png`}
										/>
										<p className="near_place">{place}</p>
									</div>
									<p className="near_organizer">{organizer}</p>
								</div>
							</EventNearHereList>
						);
					})}
			</ul>
		</StyledEventNearHere>
	);
}

export default EventNearHere;
