import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledMapResult } from "../styles/mapStyle";
import { EventType } from "../../../types";
import Event from "../../search/Event";

type MapProps = {
	events: EventType[];
};

const MapResult = ({ events }: MapProps) => {
	const navigate = useNavigate();

	return (
		<StyledMapResult>
			<div className="filterContainer">
				<div>오늘 여는 곳</div>
				<div>날짜 선택</div>
				<div>지역 선택</div>
			</div>

			<div className="eventsContainer">
				{events?.map((event) => (
					<Event key={event.id} event={event} />
				))}
			</div>
		</StyledMapResult>
	);
};

export default MapResult;
