import React from "react";
import { useRecoilValue } from "recoil";
import {
  requestArtistsAtom,
  requestBasicAtom,
  requestDateRangeAtom,
  requestGoodsListAtom,
  requestHashTagsAtom,
  requestPlaceAtom,
  requestPosterUrlsAtom,
} from "../../state/atoms";
import { EventMain, GoodsInfo, Location, TwitterInfo } from "../detail";
import { DEFAULT_POSTER_URL } from "../../shared/constants";

const PreviewContent = () => {
  const placeInputs = useRecoilValue(requestPlaceAtom);
  const artistInputs = useRecoilValue(requestArtistsAtom);
  const basicInputs = useRecoilValue(requestBasicAtom);
  const { organizer, snsId, link } = basicInputs;
  const posterUrls = useRecoilValue(requestPosterUrlsAtom);
  const hashTags = useRecoilValue(requestHashTagsAtom);
  const dateRange = useRecoilValue(requestDateRangeAtom);
  const goodsList = useRecoilValue(requestGoodsListAtom);

  return (<div className="previewContent">
    <EventMain
      place={placeInputs.place || "카페이름"}
      biasesId={[]}
      requestedBiases={artistInputs[0].bias ? artistInputs : [{ id: 1, peopleId: 0, bias: "아티스트 이름", team: "" }]}
      organizer={organizer || "주최자 닉네임"}
      snsId={snsId || "ocup_official"}
      startAt={dateRange.startAt || "20220000"}
      endAt={dateRange.endAt || "20220000"}
      address={placeInputs.address || "이벤트 주소"}
      images={posterUrls[0].publicUrl ? posterUrls.map((poster) => poster.publicUrl) : [DEFAULT_POSTER_URL]}
    />
    <TwitterInfo organizer={organizer || "주최자 닉네임"}
                 snsId={snsId || "ocup_official"}
                 hashTags={hashTags[0].text ? hashTags.map((h) => h.text) : ["해피_오컵_데이"]} />
    {goodsList[0].title ?
      <GoodsInfo goods={goodsList.map((goodsObj) => ({
        title: goodsObj.title,
        items: goodsObj.items.map((i) => i.text).filter((i) => i !== ""),
      }))} tweetUrl={link} />
      : <GoodsInfo goods={[{ title: "특전종류", items: [""] }]} tweetUrl={link} />}
    <Location address={placeInputs.address} />
  </div>);
};

export default PreviewContent;
