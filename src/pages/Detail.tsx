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

	const { place, biasesId, organizer, snsId, startAt, endAt, images, district, address, goods, hashTags, tweetUrl } =
		combinedDetail;

	// TODO: props하나로 묶어서 전달할 수 있도록 리팩토링
	return (
		<Layout page="detail" share>
			<StyledDetail>
				<div className="detailInfo">
					<div className="mainInfo">
						<EventMain
							place={place}
							biasesId={biasesId}
							organizer={organizer}
							snsId={snsId}
							startAt={startAt}
							endAt={endAt}
							address={address}
							images={images}
						/>
					</div>
					<div className="subInfo">
						<TwitterInfo organizer={organizer} snsId={snsId} hashTags={hashTags} />
						<GoodsInfo goods={goods} tweetUrl={tweetUrl} />
						<Location address={address} />
					</div>
				</div>
				<EventNearHere biasesId={biasesId} district={district} />
			</StyledDetail>
		</Layout>
	);
};

export default Detail;
