import React, { Dispatch } from "react";
import { insertDetail, insertEvent } from "../../apis";
import { RequestGoodsListType, RequestType } from "./requestType";
import { GoodsListType } from "../../types";

type ReqType = {
  requestInputs: RequestType;
  goodsList: RequestGoodsListType[];
  setSubmitModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setAlertOpen: Dispatch<React.SetStateAction<boolean>>;
}

/** all, random, dDay, firstCome, lucky, extra 형식에 맞추기 */
export const getGoodsObj = (requestInputs: RequestType, goodsList: RequestGoodsListType[]) => {
  const result = {} as GoodsListType;

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
    const tempLuck = lucky.filter((luck) => luck.text !== "").map((luck) => luck.text && `${luck.text}${luck.count ? ` (${luck.count}명)` : ""}`);
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
            result.extra = [{
              index: 1,
              title: goods.title,
              items: goods.items.filter((item) => item.text !== "").map((item) => `${item.text}`),
            }];
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

/** 신청 데이터 등록 */
export const sendReqData = async ({ requestInputs, goodsList, setSubmitModalOpen, setAlertOpen }: ReqType) => {

  const { place, artist, organizer, snsId, link, posterUrls, hashTags, dateRange } = requestInputs;

  const images = posterUrls.filter((poster) => poster.publicUrl !== "").map((poster) => poster.publicUrl);
  const requestedBiases = artist.map((a) => ({
    peopleId: a.peopleId,
    bias: a.bias,
    team: a.team,
  }));

  // 필수값 비워져 있을 때 경고 팝업
  if (!place.place || !requestedBiases[0].bias || !organizer || !dateRange.startAt || images.length === 0 || !link || !hasGoods(requestInputs, goodsList)) {
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

  setSubmitModalOpen(true);
};

export default {};