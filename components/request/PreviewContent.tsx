import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { DEFAULT_POSTER_URL } from "../../shared/constants";
import {
	requestGoodsListAtom,
	requestInputsAtom,
	tempPostersAtom,
} from "../../shared/state";
import { StyledDetail } from "../detail/styles";
import PreviewDetailMainInfo from "./PreviewDetailMainInfo";
import PreviewGoodsInfo from "./PreviewGoodsInfo";
import PreviewLocation from "./PreviewLocation";
import PreviewTwitterInfo from "./PreviewTwitterInfo";
import { getGoodsObj } from "./requestApi";

const StyledPreview = styled(StyledDetail)``;

const PreviewContent = () => {
	const requestInputs = useRecoilValue(requestInputsAtom);
	const goodsList = useRecoilValue(requestGoodsListAtom);
	const tempPosters = useRecoilValue(tempPostersAtom);

	const { place, category, artist, snsId, link, hashTags, dateRange } =
		requestInputs;

	return (
		<StyledPreview>
			<PreviewDetailMainInfo
				data={{
					place: place.place || "카페이름",
					category: category || undefined,
					biasesId: [],
					requestedBiases: artist[0].bias
						? artist
						: [{ id: 1, peopleId: 0, bias: "아티스트 이름", team: "" }],
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
			<div className="subInfo">
				<PreviewTwitterInfo
					data={{
						snsId: snsId || "ocup_official",
						hashTags: hashTags[0].text ? hashTags.map((h) => h.text) : [""],
					}}
				/>
				<PreviewGoodsInfo
					goods={getGoodsObj(requestInputs, goodsList)}
					tweetUrl={link}
				/>
				<PreviewLocation address={place.address} />
			</div>
		</StyledPreview>
	);
};

export default React.memo(PreviewContent);
