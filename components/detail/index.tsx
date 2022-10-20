import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchEventById, fetchPeople } from "../../shared/apis/common";
import { Layout, Loading } from "../../shared/components";
import DetailMainInfo from "./DetailMainInfo";
import EventNearHere from "./EventNearHere";
import GoodsInfo from "./GoodsInfo";
import TwitterInfo from "./TwitterInfo";
import Location from "./location";
import { StyledDetail } from "./styles";

const Detail = () => {
	const router = useRouter();
	const { query } = router;
	const eid = query.eid as string;

	const { data: eventData, isLoading } = useQuery(
		["detail", eid],
		() => fetchEventById({ id: eid }),
		{
			enabled: !!eid,
		}
	);

	const { data: people } = useQuery(["bias"], () => fetchPeople());

	const getBiasName = (biasId: number) => {
		if (!biasId) return "응원하는 아티스트";
		return people?.filter((p) => p.id === biasId)[0].name;
	};

	const description = `${eventData?.place}에서 열리는 ${getBiasName(
		eventData?.biasesId[0]
	)}의 이벤트를 오늘의 컵홀더에서 확인해보세요!`;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading || !eventData) {
		return (
			<Layout page="detail" description={description}>
				<Loading />
			</Layout>
		);
	}

	const { biasesId, districts, address, goods, tweetUrl } = eventData;

	return (
		<Layout page="detail" share description={description}>
			<StyledDetail>
				<div className="detailInfo">
					<div className="mainInfo">
						<DetailMainInfo data={eventData} />
					</div>
					<div className="subInfo">
						<TwitterInfo data={eventData} />
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
