import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchEventById, fetchPeople } from "../../shared/apis/common";
import { Layout, Loading } from "../../shared/components";
import EventMain from "./EventMain";
import EventNearHere from "./EventNearHere";
import GoodsInfo from "./GoodsInfo";
import Location from "./Location";
import TwitterInfo from "./TwitterInfo";
import { StyledDetail } from "./styles";
import type { EventType } from "../../shared/types";

const Detail = () => {
	const router = useRouter();
	const { query } = router;
	const eid = query.eid as string;

	const { data, isLoading }: EventType | any = useQuery(
		["detail", eid],
		() => fetchEventById({ id: eid }),
		{
			enabled: !!eid,
		}
	);

	const { data: people } = useQuery(["bias"], () => fetchPeople());

	const getBiasName = (biasId: number) =>
		people?.filter((p) => p.id === biasId)[0].name;

	const description = `${data?.place}에서 열리는 ${getBiasName(
		data?.biasesId[0]
	)}의 이벤트를 오늘의 컵홀더에서 확인해보세요!`;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading || !data)
		return (
			<Layout page="detail" description={description}>
				<Loading />
			</Layout>
		);

	const { biasesId, districts, address, goods, tweetUrl } = data;

	return (
		<Layout page="detail" share description={description}>
			<StyledDetail>
				<div className="detailInfo">
					<div className="mainInfo">
						<EventMain data={data} />
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
