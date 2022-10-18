import React from "react";
import { useRecoilValue } from "recoil";
import { DEFAULT_POSTER_URL } from "../../shared/constants";
import {
	requestGoodsListAtom,
	requestInputsAtom,
	tempPostersAtom,
} from "../../shared/state";
import DetailMainInfo from "../detail/DetailMainInfo";
import GoodsInfo from "../detail/GoodsInfo";
import Location from "../detail/location";
import TwitterInfo from "../detail/TwitterInfo";
import { getGoodsObj } from "./requestApi";

const PreviewContent = () => {
	const requestInputs = useRecoilValue(requestInputsAtom);
	const goodsList = useRecoilValue(requestGoodsListAtom);
	const tempPosters = useRecoilValue(tempPostersAtom);

	const {
		place,
		category,
		artist,
		organizer,
		snsId,
		link,
		hashTags,
		dateRange,
	} = requestInputs;

	return (
		<div className="previewContent">
			<DetailMainInfo
				data={{
					place: place.place || "카페이름",
					category: category || "A",
					biasesId: [],
					requestedBiases: artist[0].bias
						? artist
						: [{ id: 1, peopleId: 0, bias: "아티스트 이름", team: "" }],
					organizer: organizer || "주최자 닉네임",
					snsId: snsId || "ocup_official",
					startAt: dateRange.startAt || "20220000",
					endAt: dateRange.endAt || "20220000",
					address: place.address || "이벤트 주소",
					images: tempPosters[0].result
						? tempPosters
								.filter((poster) => poster.result !== "")
								.map((poster) => poster.result)
						: [DEFAULT_POSTER_URL],
				}}
				posterPopupDisabled
			/>
			<TwitterInfo
				data={{
					organizer: organizer || "주최자 닉네임",
					snsId: snsId || "ocup_official",
					hashTags: hashTags[0].text ? hashTags.map((h) => h.text) : [""],
				}}
			/>
			<GoodsInfo
				goods={getGoodsObj(requestInputs, goodsList)}
				tweetUrl={link}
			/>
			<Location address={place.address} />
		</div>
	);
};

export default React.memo(PreviewContent);
