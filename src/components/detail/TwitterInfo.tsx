import React from "react";
import { FaTwitter } from "react-icons/fa";
import { DetailType, EventType } from "../../types";
import { StyledTwitterInfo } from "./styles/twitterInfoStyle";

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
			<div className="hashTags">{hashTags?.map((tag) => (tag === "" ? null : <p key={tag}>#{tag}</p>))}</div>
		</StyledTwitterInfo>
	);
}

export default TwitterInfo;
