import React from "react";
import { useRecoilValue } from "recoil";
import {
  requestArtistsAtom,
  requestBasicAtom, requestDateRangeAtom, requestGoodsListAtom,
  requestHashTagsAtom,
  requestPlaceAtom,
  requestPosterUrlsAtom,
} from "../../state/atoms";
import { StyledPreview } from "./styles/requestStyle";
import { EventMain, GoodsInfo, Location, TwitterInfo } from "../detail";

const Preview = () => {
  const placeInputs = useRecoilValue(requestPlaceAtom);
  const artistInputs = useRecoilValue(requestArtistsAtom);
  const basicInputs = useRecoilValue(requestBasicAtom);
  const { organizer, snsId, link } = basicInputs;
  const posterUrls = useRecoilValue(requestPosterUrlsAtom);
  const hashTags = useRecoilValue(requestHashTagsAtom);
  const dateRange = useRecoilValue(requestDateRangeAtom);
  const goodsList = useRecoilValue(requestGoodsListAtom);

  return (<StyledPreview>
    <EventMain
      place={placeInputs.place || "카페이름"}
      biasesId={[]}
      requestedBiases={artistInputs}
      organizer={organizer || "주최자 닉네임"}
      snsId={snsId || "ocup"}
      startAt={dateRange.startAt || "20220000"}
      endAt={dateRange.endAt || "20220000"}
      address={placeInputs.address || "이벤트 주소"}
      images={posterUrls}
    />
    <TwitterInfo organizer={organizer || "주최자 닉네임"} snsId={snsId || "ocup"} hashTags={hashTags.map((h) => h.text)} />
    {goodsList[0].title &&
      <GoodsInfo goods={goodsList.map((goodsObj) => ({
        title: goodsObj.title,
        items: goodsObj.items.map((i) => i.text).filter((i) => i !== ""),
      }))} tweetUrl={link} />}
    <Location address={placeInputs.address} />
  </StyledPreview>);
};

export default Preview;
