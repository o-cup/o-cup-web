import React, { Dispatch } from "react";
import { insertDetail, insertEvent } from "../../apis";
import { RequestType } from "./requestType";

type ReqType = {
  requestInputs: RequestType;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const sendReqData = async ({ requestInputs, setModalOpen }: ReqType) => {

  // todo: 필수값 비워져 있을 때 경고 팝업 필요
  if (!requestInputs.place.place) {
    alert("필수값 채워주세요!");
    return;
  }

  const { place, artist, organizer, snsId, link, posterUrls, hashTags, dateRange, goods } = requestInputs;

  const eventParams = {
    place: place.place,
    organizer,
    snsId,
    district: place.district,
    startAt: dateRange.startAt,
    endAt: dateRange.endAt,
    images: posterUrls.map((poster) => poster.publicUrl),
    requestedBiases: artist.map((a) => ({
      peopleId: a.peopleId,
      bias: a.bias,
      team: a.team,
    })),
    isRequested: true,
    isApproved: false,
  };

  const detailParams = {
    // id: 0,
    address: place.address,
    hashTags: hashTags.map((h) => h.text),
    // todo: 특전 형식 변경
    // goods: goodsList.map((goodsObj) => ({
    //   title: goodsObj.title,
    //   items: goodsObj.items.map((i) => i.text),
    // })),
    tweetUrl: link,
  };

  const eventData = await insertEvent(eventParams);
  if (eventData) {
    await insertDetail({
      id: eventData[0].id,
      ...detailParams,
    });
  }

  setModalOpen(true);
};

export default {};