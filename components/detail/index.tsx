import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { updateViews } from "../../shared/apis/common";
import { Layout } from "../../shared/components";
import KakaoAdFitDetail from "../../shared/components/KaKaoAdFit/KakaoAdFitDetail";
import { searchFiltersAtom } from "../../shared/state";
import DetailMainInfo from "./DetailMainInfo";
import EventNearHere from "./EventNearHere";
import GoodsInfo from "./GoodsInfo";
import TwitterInfo from "./TwitterInfo";
import Location from "./location";
import { StyledDetail } from "./styles";

const Detail = () => {
	const router = useRouter();
	const searchFilters = useRecoilValue(searchFiltersAtom);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		/** 조회수 업데이트 */
		if (!window.location.href.includes("localhost")) {
			// updateViews(id, views).then();
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
						<DetailMainInfo />
					</div>
					<div className="subInfo">
						<TwitterInfo />
						<KakaoAdFitDetail />
						<GoodsInfo />
						<Location />
					</div>
				</div>
				<EventNearHere />
			</StyledDetail>
		</Layout>
	);
};

export default Detail;
