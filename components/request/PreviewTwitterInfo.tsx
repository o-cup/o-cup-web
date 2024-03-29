import React from "react";
import { StyledTwitterInfo } from "../detail/styles/twitterInfoStyle";
import type { EventType } from "../../shared/types";

type TwitterInfoProps = {
	data: Partial<EventType>;
};

function PreviewTwitterInfo({ data }: TwitterInfoProps) {
	const { snsId, hashTags, tweetUrl } = data;
	return (
		<StyledTwitterInfo>
			<div className="account">
				<button
					className="link"
					type="button"
					onClick={() => tweetUrl && window.open(tweetUrl)}
				>
					<span>@{snsId} 님의 공지 바로가기</span>
				</button>
			</div>
			<div className="hashTags">
				{hashTags?.map((tag) => (tag === "" ? null : <p key={tag}>#{tag}</p>))}
			</div>
		</StyledTwitterInfo>
	);
}

export default PreviewTwitterInfo;
