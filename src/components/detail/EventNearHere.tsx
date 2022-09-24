import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEvents } from "../../apis";
import { EventType } from "../../types";
import { EventNearHereList, StyledEventNearHere } from "./styles/eventNearHereStyle";
import { DEFAULT_POSTER_URL } from "../../shared/constants";

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

	const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = DEFAULT_POSTER_URL;
		e.currentTarget.className = "error";
	};

	if (!nearEvent || nearEvent.length === 0) {
		return null;
	}

	return (
		<StyledEventNearHere>
			<h4>{newDistrict?.name || "가까운"} 연관 이벤트</h4>
			<ul>
				{nearEvent &&
					nearEvent.map((event) => {
						const { id: eventId, images, place, organizer } = event;
						const previewUrl = (images && images[0]) || "";
						return (
							<EventNearHereList key={eventId} onClick={() => navigate(`/detail/${eventId}`)}>
								{previewUrl && <img alt={previewUrl} src={previewUrl} onError={imageOnErrorHandler} />}
								<div>
									<h6>{place}</h6>
									<p>{organizer}</p>
								</div>
							</EventNearHereList>
						);
					})}
			</ul>
		</StyledEventNearHere>
	);
}

export default EventNearHere;
