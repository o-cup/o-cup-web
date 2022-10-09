import { insertEvent, uploadPoster } from "../../apis";
import type { GoodsListType } from "../../../shared/types";
import type { RequestGoodsListType, RequestType } from "../../../shared/types/request";
import type React from "react";
import type { Dispatch } from "react";

type ReqType = {
	requestInputs: RequestType;
	goodsList: RequestGoodsListType[];
	tempPosters: { id: number; file: any; result: string }[];
	setSubmitModalOpen: Dispatch<React.SetStateAction<boolean>>;
	setConfirmModalOpen: Dispatch<React.SetStateAction<boolean>>;
	setAlertOpen: Dispatch<React.SetStateAction<boolean>>;
	setLoading: Dispatch<React.SetStateAction<boolean>>;
};

/** all, random, dDay, firstCome, lucky, extra 형식에 맞추기 */
export const getGoodsObj = (requestInputs: RequestType, goodsList: RequestGoodsListType[]) => {
	const result = {} as GoodsListType;

	const { firstCome, lucky } = requestInputs.goods;
	if (firstCome && (firstCome.type === "A" || firstCome.type === "B" || firstCome.type === "C")) {
		result.firstCome = {
			type: firstCome.type,
			data: firstCome.data.map((d) => ({
				...d,
				items: d.items
					.filter((item) => item.text !== "")
					.map((item) => `${item.text}${item.count ? ` (${item.count}명)` : ""}`),
			})),
		};
	}
	if (lucky) {
		const tempLuck = lucky
			.filter((luck) => luck.text !== "")
			.map((luck) => luck.text && `${luck.text}${luck.count ? ` (${luck.count}명)` : ""}`);
		if (tempLuck.length > 0) {
			result.lucky = tempLuck;
		}
	}

	if (goodsList) {
		goodsList.forEach((goods) => {
			if (goods.key === "all" || goods.key === "random" || goods.key === "dDay") {
				const temp = goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`);
				if (temp.length > 0) {
					result[goods.key] = temp;
				}
			}
			if (goods.key === "" && goods.title) {
				const tempExtraItems = goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`);
				if (tempExtraItems.length > 0) {
					if (result.extra) {
						result.extra?.push({
							index: result.extra.length + 1,
							title: goods.title,
							items: goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`),
						});
					} else {
						result.extra = [
							{
								index: 1,
								title: goods.title,
								items: goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`),
							},
						];
					}
				}
			}
		});
	}
	return result;
};

/** 특전 한 종류라도 있으면 return true */
const hasGoods = (requestInputs: RequestType, goodsList: RequestGoodsListType[]) => {
	const goodsObj = getGoodsObj(requestInputs, goodsList);

	let result = false;
	if (
		(goodsObj.all && goodsObj.all?.length > 0) ||
		(goodsObj.random && goodsObj.random?.length > 0) ||
		(goodsObj.dDay && goodsObj.dDay?.length > 0) ||
		(goodsObj.extra && goodsObj.extra?.length > 0) ||
		(goodsObj.lucky && goodsObj.lucky?.length > 0) ||
		(goodsObj.firstCome?.type && goodsObj.firstCome?.data.length > 0)
	) {
		result = true;
	}
	return result;
};

/** 포스터 이미지 업로드 후 return [urls] */
const getPublicUrls = async (tempPosters: { id: number; file: any; result: string }[]) => {
	const tempImages = tempPosters.filter((poster) => poster.result !== "");

	const posterUrls = [] as string[];
	// 포스터 차례대로 업로드 되어야하기 때문에 eslint-disable 처리함
	/* eslint-disable no-await-in-loop */
	for (let i = 0; i < tempImages.length; i += 1) {
		const data = await uploadPoster(tempPosters[i].file);
		if (data) {
			posterUrls.push(data);
		}
	}
	/* eslint-disable no-await-in-loop */
	return posterUrls;
};

/** 신청 데이터 등록 */
export const sendReqData = async ({
	requestInputs,
	goodsList,
	tempPosters,
	setSubmitModalOpen,
	setConfirmModalOpen,
	setAlertOpen,
	setLoading,
}: ReqType) => {
	const { place, artist, organizer, snsId, link, hashTags, dateRange } = requestInputs;

	const requestedBiases = artist.map((a) => ({
		peopleId: a.peopleId,
		bias: a.bias,
		team: a.team,
	}));

	const images = await getPublicUrls(tempPosters);

	// 필수값 비워져 있을 때 경고 팝업
	if (
		!place.place ||
		!requestedBiases[0].bias ||
		!organizer ||
		!dateRange.startAt ||
		images.length === 0 ||
		!link ||
		!hasGoods(requestInputs, goodsList)
	) {
		setAlertOpen(true);
		return;
	}

	const eventParams = {
		place: place.place,
		category: "A", // TODO: 카테고리 수정 필요
		organizer,
		snsId,
		districts: place.districts,
		address: place.address,
		hashTags: hashTags.map((h) => h.text),
		goods: getGoodsObj(requestInputs, goodsList),
		tweetUrl: link,
		startAt: dateRange.startAt,
		endAt: dateRange.endAt,
		images,
		requestedBiases,
		isRequested: true,
		isApproved: false,
		views: 0,
	};

	const eventData = await insertEvent(eventParams);

	setLoading(false);
	setConfirmModalOpen(false);
	setSubmitModalOpen(true);
};

export default {};
