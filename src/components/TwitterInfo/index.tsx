import React from "react";
import { FaTwitter } from "react-icons/fa";
import { StyledTwitterInfo } from "../../styles";
import { DetailType, EventType } from "../../types";

type TwitterInfoProps = Partial<EventType> & Partial<DetailType>;

function TwitterInfo({ organizer, snsId, hashTags }: TwitterInfoProps) {
	return (
		<StyledTwitterInfo>
			<div className="account">
				<h6>{organizer}</h6>
				<p>
					<FaTwitter />@{snsId}
				</p>
			</div>
			<div className="hashTags">
				{hashTags?.map((tag) => (
					<p key={tag}>#{tag}</p>
				))}
			</div>
		</StyledTwitterInfo>
	);
}

export default TwitterInfo;
