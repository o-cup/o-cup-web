import React, { useEffect } from "react";
import { updateViews } from "../../shared/apis/common";
import { Layout } from "../../shared/components";
import DetailMainInfo from "./DetailMainInfo";
import EventNearHere from "./EventNearHere";
import GoodsInfo from "./GoodsInfo";
import TwitterInfo from "./TwitterInfo";
import Location from "./location";
import { StyledDetail } from "./styles";
import type { EventType } from "../../shared/types";

type DetailProps = {
	data: EventType;
};

const Detail = ({ data }: DetailProps) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { id, biasesId, districts, address, goods, tweetUrl, views } = data;

	useEffect(() => {
		/** 조회수 업데이트 */
		updateViews(id, views).then();
	}, []);

	return (
		<Layout page="detail" share>
			<StyledDetail>
				<div className="detailInfo">
					<div className="mainInfo">
						<DetailMainInfo data={data} />
					</div>
					<div className="subInfo">
						<TwitterInfo data={data} />
						<GoodsInfo goods={goods} tweetUrl={tweetUrl} />
						<Location address={address} />
					</div>
				</div>
				<EventNearHere biasesId={biasesId} districts={districts} />
			</StyledDetail>
		</Layout>
	);
};

export default Detail;
