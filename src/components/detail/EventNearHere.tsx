import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEvents } from "../../apis";
import { EventType } from "../../types";
import { EventNearHereList, StyledEventNearHere } from "./styles/eventNearHereStyle";
import { imageOnErrorHandler } from "../../shared/utils/imageHandlers";

function EventNearHere({ biasesId, newDistrict }: Partial<EventType>) {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: nearEvent } = useQuery(["event", id], fetchEvents, {
		enabled: !!id,
		select: (data) =>
			data?.filter((item) => {
				if (biasesId && biasesId[0]) {
					return item.id !== id && item.newDistrict.name === newDistrict?.name && item.biasesId[0] === biasesId[0];
				}
				return null;
			}),
	});

	if (!nearEvent || nearEvent.length === 0) {
		return null;
	}

	return (
		<StyledEventNearHere>
			<p className="title">{newDistrict?.name || "가까운"} 연관 이벤트</p>
			<ul>
				{nearEvent &&
					nearEvent.map((event) => {
						const { id: eventId, images, place, organizer } = event;
						const previewUrl = (images && images[0]) || "";
						return (
							<EventNearHereList key={eventId} onClick={() => navigate(`/detail/${eventId}`)}>
								{previewUrl && <img alt={previewUrl} src={previewUrl} onError={imageOnErrorHandler} />}
								<div>
									<p className="near_place">{place}</p>
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
