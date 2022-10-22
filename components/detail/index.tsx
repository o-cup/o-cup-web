import React, { useEffect } from "react";
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
	// const { data: eventData, isLoading } = useQuery(
	// 	["detail", eid],
	// 	() => fetchEventById({ id: eid }),
	// 	{
	// 		enabled: !!eid,
	// 	}
	// );

	// const { data: people } = useQuery(["bias"], () => fetchPeople());

	// const getBiasName = (biasId: number) => {
	// 	if (!biasId) return "응원하는 아티스트";
	// 	return people?.filter((p) => p.id === biasId)[0].name;
	// };

	// const description = `${eventData?.place}에서 열리는 ${getBiasName(
	// 	eventData?.biasesId[0]
	// )}의 이벤트를 오늘의 컵홀더에서 확인해보세요!`;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// if (isLoading || !data) {
	// 	return (
	// 		<Layout page="detail">
	// 			<Loading />
	// 		</Layout>
	// 	);
	// }

	const { biasesId, districts, address, goods, tweetUrl } = data;

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
