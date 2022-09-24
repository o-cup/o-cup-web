import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchEventDetail } from "../apis";
import { EventType, DetailType } from "../types";
import { StyledDetail } from "../components/detail/styles/detailStyle";
import { EventMain, EventNearHere, GoodsInfo, TwitterInfo, Location } from "../components/detail";
import Layout from "../shared/components/layout";
import Loading from "../shared/components/Loading";

const Detail = () => {
	const { id } = useParams();

	const { data: combinedDetail, isLoading }: (EventType & DetailType) | any = useQuery(
		["detail", id],
		() => fetchEventDetail({ id }),
		{
			enabled: !!id,
		}
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading || !combinedDetail)
		return (
			<Layout page="detail">
				<Loading />
			</Layout>
		);

	const { biasesId, newDistrict, address, goods, tweetUrl } = combinedDetail;

	return (
		<Layout page="detail" share>
			<StyledDetail>
				<div className="detailInfo">
					<div className="mainInfo">
						<EventMain data={combinedDetail} />
					</div>
					<div className="subInfo">
						<TwitterInfo data={combinedDetail} />
						<GoodsInfo goods={goods} tweetUrl={tweetUrl} />
						<Location address={address} />
					</div>
				</div>
				<EventNearHere biasesId={biasesId} newDistrict={newDistrict} />
			</StyledDetail>
		</Layout>
	);
};

export default Detail;
