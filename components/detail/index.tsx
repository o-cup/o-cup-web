import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { updateViews } from "../../shared/apis/common";
import { Layout } from "../../shared/components";
import { searchFiltersAtom } from "../../shared/state";
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
	const router = useRouter();
	const searchFilters = useRecoilValue(searchFiltersAtom);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { id, biasesId, districts, address, goods, tweetUrl, views } = data;

	useEffect(() => {
		/** 조회수 업데이트 */
		if (!window.location.href.includes("localhost")) {
			updateViews(id, views).then();
		}
	}, []);

	const handleBackClick = () => {
		const { bid, placeName } = searchFilters;
		if (!bid && !placeName) {
			router.push("/");
			return;
		}
		router.back();
	};

	return (
		<Layout page="detail" share handleBackClick={handleBackClick}>
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
