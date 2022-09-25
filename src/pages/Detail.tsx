import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchBiases, fetchEventDetail } from "../apis";
import { EventType, DetailType } from "../types";
import { StyledDetail } from "../components/detail/styles/detailStyle";
import { EventMain, EventNearHere, GoodsInfo, TwitterInfo, Location } from "../components/detail";
import Layout from "../shared/components/layout";
import Loading from "../shared/components/Loading";
import { setMetaTags } from "../shared/utils/metaTagHandlers";

const Detail = () => {
	const { id } = useParams();

	const { data: combinedDetail, isLoading }: (EventType & DetailType) | any = useQuery(
		["detail", id],
		() => fetchEventDetail({ id }),
		{
			enabled: !!id,
		}
	);

	const { data: name } = useQuery(["bias", combinedDetail], () => fetchBiases({ id: combinedDetail.biasesId[0] }), {
		enabled: !!combinedDetail,
	});

	useEffect(() => {
		if (combinedDetail?.place && name) {
			setMetaTags({
				title: "오늘의 컵홀더 | 상세보기",
				description: `${combinedDetail.place}에서 열리는 ${name}의 이벤트를 오늘의 컵홀더에서 확인해보세요!`,
			});
		}
		return () => {
			setMetaTags({});
		};
	}, [combinedDetail, name]);

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
