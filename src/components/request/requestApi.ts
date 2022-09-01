import React, { Dispatch } from "react";
import { insertDetail, insertEvent } from "../../apis";
import { RequestGoodsListType, RequestType } from "./requestType";
import { GoodsListType } from "../../types";

type ReqType = {
  requestInputs: RequestType;
  goodsList: RequestGoodsListType[];
  setConfirmModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setAlertOpen: Dispatch<React.SetStateAction<boolean>>;
}

/** all, random, dDay, firstCome, lucky, extra 형식에 맞추기 */
const getGoodsObj = (requestInputs: RequestType, goodsList: RequestGoodsListType[]) => {
  const result = {
    extra: [],
  } as GoodsListType;

  const { firstCome, lucky } = requestInputs.goods;
  if (firstCome && (firstCome.type === "A" || firstCome.type === "B" || firstCome.type === "C")) {
    result.firstCome = {
      type: firstCome.type,
      data: firstCome.data.map((d) => ({
        ...d,
        items: d.items.filter((item) => item.text !== "").map((item) => `${item.text}${item.count ? ` (${item.count}명)` : ""}`),
      })),
    };
  }
  if (lucky) {
    result.lucky = lucky.filter((luck) => luck.text !== "")
      .map((luck) => luck.text && `${luck.text}${luck.count ? ` (${luck.count}명)` : ""}`);
  }

  if (goodsList) {
    goodsList.forEach((goods) => {
      if (goods.key === "all") {
        result.all = goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`);
      }
      if (goods.key === "random") {
        result.random = goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`);
      }
      if (goods.key === "dDay") {
        result.dDay = goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`);
      }
      if (goods.key === "" && goods.title) {
        result.extra?.push({
          index: (result.extra?.length || 0) + 1,
          title: goods.title,
          items: goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`),
        });
      }
    });
  }
  return result;
};

export const sendReqData = async ({ requestInputs, goodsList, setConfirmModalOpen, setAlertOpen }: ReqType) => {

  const { place, artist, organizer, snsId, link, posterUrls, hashTags, dateRange } = requestInputs;

  const images = posterUrls.filter((poster) => poster.publicUrl !== "").map((poster) => poster.publicUrl);
  const requestedBiases = artist.map((a) => ({
    peopleId: a.peopleId,
    bias: a.bias,
    team: a.team,
  }));

  const hasGoods = () => {
    const goodsObj = getGoodsObj(requestInputs, goodsList);
    console.log(goodsObj);
    let result = false;
    if ((goodsObj.all && goodsObj.all?.length > 0)
      || (goodsObj.random && goodsObj.random?.length > 0)
      || (goodsObj.dDay && goodsObj.dDay?.length > 0)
      || (goodsObj.extra && goodsObj.extra?.length > 0)
      || (goodsObj.lucky && goodsObj.lucky?.length > 0)
      || (goodsObj.firstCome?.type && goodsObj.firstCome?.data.length > 0)) {
      result = true;
    }
    return result;
  };

  // todo: 필수값 비워져 있을 때 경고 팝업 필요
  if (!place.place || !requestedBiases[0].bias || !organizer || !dateRange.startAt || images.length === 0 || !link || !hasGoods()) {
    setAlertOpen(true);
    return;
  }

  const eventParams = {
    place: place.place,
    organizer,
    snsId,
    district: place.district,
    startAt: dateRange.startAt,
    endAt: dateRange.endAt,
    images,
    requestedBiases,
    isRequested: true,
    isApproved: false,
  };

  const detailParams = {
    // id: 0,
    address: place.address,
    hashTags: hashTags.map((h) => h.text),
    goods: getGoodsObj(requestInputs, goodsList),
    tweetUrl: link,
  };

  const eventData = await insertEvent(eventParams);
  if (eventData) {
    await insertDetail({
      id: eventData[0].id,
      ...detailParams,
    });
  }

  setConfirmModalOpen(true);
};

export default {};