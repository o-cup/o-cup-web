import React from "react";
import { useQueryClient } from "react-query";
import { StyledTwitterInfo } from "./styles/twitterInfoStyle";
import type { EventType } from "../../shared/types";

function TwitterInfo() {
	const queryClient = useQueryClient();

	const { snsId, hashTags, tweetUrl } = queryClient.getQueryData([
		"detail",
	]) as EventType;

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

export default TwitterInfo;
