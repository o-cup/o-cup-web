import React from "react";
import { FaTwitter } from "react-icons/fa";
import { DetailType, EventType } from "../../types";
import { StyledTwitterInfo } from "./styles/twitterInfoStyle";

type TwitterInfoProps = {
	data: Partial<EventType> & Partial<DetailType>;
};

function TwitterInfo({ data }: TwitterInfoProps) {
	const { organizer, snsId, hashTags } = data;
	return (
		<StyledTwitterInfo>
			<div className="account">
				<p className="organizer">{organizer}</p>
				<p className="snsId">
					<FaTwitter />
					{snsId ? `@${snsId}` : "-"}
				</p>
			</div>
			<div className="hashTags">{hashTags?.map((tag) => (tag === "" ? null : <p key={tag}>#{tag}</p>))}</div>
		</StyledTwitterInfo>
	);
}

export default TwitterInfo;
