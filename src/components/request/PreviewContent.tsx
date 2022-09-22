import React from "react";
import { useRecoilValue } from "recoil";
import { requestGoodsListAtom, requestInputsAtom } from "../../state/atoms";
import { getGoodsObj } from "./requestApi";
import { EventMain, GoodsInfo, Location, TwitterInfo } from "../detail";
import { DEFAULT_POSTER_URL } from "../../shared/constants";

const PreviewContent = () => {
	const requestInputs = useRecoilValue(requestInputsAtom);
	const goodsList = useRecoilValue(requestGoodsListAtom);

	const { place, artist, organizer, snsId, link, posterUrls, hashTags, dateRange } = requestInputs;

	return (
		<div className="previewContent">
			<EventMain
				data={{
					place: place.place || "카페이름",
					biasesId: [],
					requestedBiases: artist[0].bias ? artist : [{ id: 1, peopleId: 0, bias: "아티스트 이름", team: "" }],
					organizer: organizer || "주최자 닉네임",
					snsId: snsId || "ocup_official",
					startAt: dateRange.startAt || "20220000",
					endAt: dateRange.endAt || "20220000",
					address: place.address || "이벤트 주소",
					images: posterUrls[0].publicUrl
						? posterUrls.filter((poster) => poster.publicUrl !== "").map((poster) => poster.publicUrl)
						: [DEFAULT_POSTER_URL],
				}}
			/>
			<TwitterInfo
				data={{
					organizer: organizer || "주최자 닉네임",
					snsId: snsId || "ocup_official",
					hashTags: hashTags[0].text ? hashTags.map((h) => h.text) : [""],
				}}
			/>
			<GoodsInfo goods={getGoodsObj(requestInputs, goodsList)} tweetUrl={link} />
			<Location address={place.address} />
		</div>
	);
};

export default PreviewContent;
