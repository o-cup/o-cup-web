import React from "react";
import { BiUserCircle, BiMap } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import { StyledEventMain } from "../../styles";
import { EventType, DetailType } from "../../types";

type EventMainProps = Partial<EventType> & Partial<DetailType>;

const EventMain = ({ place, bias, organizer, snsId, startAt, endAt, address }: EventMainProps) => (
	<StyledEventMain>
		<div className="textContainer">
			<div>
				<h6>{place}</h6>
				<span>{bias}</span>
			</div>
			<p>
				<BiUserCircle />
				{organizer} {snsId}
			</p>
			<p>
				<BiMap />
				{address}
			</p>
			<p>
				<FiCalendar />
				{startAt} - {endAt}
			</p>
		</div>
		<div className="imgContainer">
			<img alt="sample" src="https://pbs.twimg.com/media/FWgAyjfaIAEHkKO?format=jpg&name=4096x4096" />
		</div>
	</StyledEventMain>
);

export default EventMain;
