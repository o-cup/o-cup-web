import React from "react";
import { FaTwitter } from "react-icons/fa";
import { StyledTwitterInfo } from "./styles/twitterInfoStyle";
import type { EventType } from "../../shared/types";

type TwitterInfoProps = {
	data: Partial<EventType>;
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
