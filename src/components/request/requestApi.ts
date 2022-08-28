import React, { Dispatch } from "react";
import { insertDetail, insertEvent } from "../../apis";
import {
  ItemsType,
  RequestArtistType,
  RequestBasicType,
  RequestDateRangeType,
  RequestPlaceType,
  RequestPosterType,
} from "./requestType";

type ReqType = {
  placeInputs: RequestPlaceType;
  organizer: string;
  snsId: string;
  dateRange: RequestDateRangeType;
  posterUrls: RequestPosterType[];
  artistInputs: RequestArtistType[];
  hashTags: ItemsType[];
  goodsList: { id: number, title: string, items: { id: number, text: string }[] }[];
  link: string;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const sendReqData = async ({
                                    placeInputs,
                                    organizer,
                                    snsId,
                                    dateRange,
                                    posterUrls,
                                    artistInputs,
                                    hashTags,
                                    goodsList,
                                    link,
                                    setModalOpen,
                                  }: ReqType) => {

  // todo: 필수값 비워져 있을 때 경고 팝업 필요
  if (!placeInputs.place) {
    alert("필수값 채워주세요!");
    return;
  }

  const eventParams = {
    place: placeInputs.place,
    organizer,
    snsId,
    district: placeInputs.district,
    startAt: dateRange.startAt,
    endAt: dateRange.endAt,
    images: posterUrls.map((poster) => poster.publicUrl),
    requestedBiases: artistInputs.map((artist) => ({
      peopleId: artist.peopleId,
      bias: artist.bias,
      team: artist.team,
    })),
    isRequested: true,
    isApproved: false,
  };

  const detailParams = {
    // id: 0,
    address: placeInputs.address,
    hashTags: hashTags.map((h) => h.text),
    goods: goodsList.map((goodsObj) => ({
      title: goodsObj.title,
      items: goodsObj.items.map((i) => i.text),
    })),
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

type ResetType = {
  setPlaceInputs: Dispatch<React.SetStateAction<RequestPlaceType>>;
  setArtistInputs: Dispatch<React.SetStateAction<RequestArtistType[]>>;
  setBasicInputs: Dispatch<React.SetStateAction<RequestBasicType>>;
  setPosterUrls: Dispatch<React.SetStateAction<RequestPosterType[]>>;
  setHashTags: Dispatch<React.SetStateAction<ItemsType[]>>;
  setDateRange: Dispatch<React.SetStateAction<RequestDateRangeType>>;
  setGoodsList: Dispatch<React.SetStateAction<{ id: number, title: string, items: { id: number, text: string }[] }[]>>;
}

export const resetReqData = ({
                               setPlaceInputs,
                               setArtistInputs,
                               setBasicInputs,
                               setPosterUrls,
                               setHashTags,
                               setDateRange,
                               setGoodsList,
                             }: ResetType) => {
  setPlaceInputs({
    place: "",
    district: "",
    address: "",
  });
  setArtistInputs([
    {
      id: 1,
      peopleId: 0,
      bias: "",
      team: "",
    },
  ]);
  setBasicInputs({ organizer: "", snsId: "", link: "" });
  setPosterUrls([{ id: 1, publicUrl: "" }]);
  setHashTags([{ id: 1, text: "" }]);
  setDateRange({
    startAt: "",
    endAt: "",
  });
  setGoodsList([
    {
      id: 1,
      title: "",
      items: [{ id: 1, text: "" }],
    },
  ]);
};