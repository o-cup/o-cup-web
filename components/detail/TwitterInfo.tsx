import React from "react";
import { useQueryClient } from "react-query";
import { StyledTwitterInfo } from "./styles/twitterInfoStyle";
import type { EventType } from "../../shared/types";

function TwitterInfo() {
	const queryClient = useQueryClient();

	const { snsId, hashTags, tweetUrl } = queryClient.getQueryData([
		"detail",
	]) as EventType;
	const tags = hashTags.filter(Boolean);

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
			{tags?.length ? (
				<div className="hashTags">
					{tags?.map((tag) => (
						<p key={tag}>#{tag}</p>
					))}
				</div>
			) : null}
		</StyledTwitterInfo>
	);
}

export default TwitterInfo;
