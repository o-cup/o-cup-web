import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchEventById, fetchPeople } from "../apis";
import { EventType } from "../types";
import { StyledDetail } from "../components/detail/styles/detailStyle";
import { DetailMainInfo, EventNearHere, GoodsInfo, TwitterInfo, Location } from "../components/detail";
import Layout from "../shared/components/layout";
import Loading from "../shared/components/Loading";
import { setMetaTags } from "../shared/utils/metaTagHandlers";

const Detail = () => {
	const { id } = useParams();

	const { data, isLoading }: EventType | any = useQuery(["detail", id], () => fetchEventById({ id }), {
		enabled: !!id,
	});

	const { data: people } = useQuery(["bias"], () => fetchPeople());

	const getBiasName = (biasId: number) => people?.filter((p) => p.id === biasId)[0].name;

	useEffect(() => {
		if (data?.place && data?.biasesId[0] && people) {
			setMetaTags({
				title: "오늘의 컵홀더 | 상세보기",
				description: `${data.place}에서 열리는 ${getBiasName(
					data?.biasesId[0]
				)}의 이벤트를 오늘의 컵홀더에서 확인해보세요!`,
			});
		}
		return () => {
			setMetaTags({});
		};
	}, [data, people]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading || !data)
		return (
			<Layout page="detail">
				<Loading />
			</Layout>
		);

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
