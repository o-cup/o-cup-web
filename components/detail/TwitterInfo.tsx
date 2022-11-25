import React from "react";
import { StyledTwitterInfo } from "./styles/twitterInfoStyle";
import type { EventType } from "../../shared/types";

type TwitterInfoProps = {
	data: Partial<EventType>;
};

function TwitterInfo({ data }: TwitterInfoProps) {
	const { snsId, hashTags, tweetUrl } = data;
	return (
		<StyledTwitterInfo>
			<div className="account">
				<button
					className="link"
					onClick={() => tweetUrl && window.open(tweetUrl)}
				>
					<span>@{snsId}님의 공지 바로가기</span>
				</button>
			</div>
			<div className="hashTags">
				{hashTags?.map((tag) => (tag === "" ? null : <p key={tag}>#{tag}</p>))}
			</div>
		</StyledTwitterInfo>
	);
}

export default TwitterInfo;
