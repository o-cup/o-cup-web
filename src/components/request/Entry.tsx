import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  requestArtistsAtom,
  requestBasicAtom,
  requestDateRangeAtom,
  requestGoodsListAtom,
  requestHashTagsAtom,
  requestPlaceAtom,
  requestPosterUrlsAtom
} from "../../state/atoms";
import Button from "../../shared/components/Button";
import BasicInput from "./BasicInput";
import PosterUploader from "./PosterUploader";
import { StyledEntry } from "./styles/requestStyle";
import PlaceInput from "./PlaceInput";
import ArtistInputContainer from "./ArtistInputContainer";
import DateRangeInput from "./DateRangeInput";
import GoodsInputContainer from "./GoodsInputContainer";
import { insertDetail, insertEvent } from "../../apis";
import Modal from "./Modal";
import HashTagsContainer from "./HashTagsContainer";

const Entry = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [placeInputs, setPlaceInputs] = useRecoilState(requestPlaceAtom);
  const [artistInputs, setArtistInputs] = useRecoilState(requestArtistsAtom);
  const [basicInputs, setBasicInputs] = useRecoilState(requestBasicAtom);
  const { organizer, snsId, link } = basicInputs;
  const [posterUrls, setPosterUrls] = useRecoilState(requestPosterUrlsAtom);
  const [hashTags, setHashTags] = useRecoilState(requestHashTagsAtom);
  const [dateRange, setDateRange] = useRecoilState(requestDateRangeAtom);
  const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setBasicInputs({
      ...basicInputs,
      [id]: e.currentTarget.value
    });
  };

  const handleInputDelete = (e: React.MouseEvent, id: string) => {
    setBasicInputs((prev) => ({
      ...prev,
      [id]: ""
    }));
  };

  const handleSubmit = async () => {
    // todo: 필수값 비워져 있을 때 경고 팝업
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
      images: posterUrls,
      requestedBiases: artistInputs.map((artist) => ({
        peopleId: artist.peopleId,
        bias: artist.bias,
        team: artist.team
      })),
      isRequested: true,
      isApproved: false
    };

    const detailParams = {
      // id: 0,
      address: placeInputs.address,
      hashTags: hashTags.map((h) => h.text),
      goods: goodsList.map((goodsObj) => ({
        title: goodsObj.title,
        items: goodsObj.items.map((i) => i.text)
      })),
      tweetUrl: link
    };

    const eventData = await insertEvent(eventParams);
    if (eventData) {
      await insertDetail({
        id: eventData[0].id,
        ...detailParams
      });
    }

    setModalOpen(true);
  };

  const resetAllStates = () => {
    setPlaceInputs({
      place: "",
      district: "",
      address: ""
    });
    setArtistInputs([
      {
        id: 1,
        peopleId: 0,
        bias: "",
        team: ""
      }
    ]);
    setBasicInputs({ organizer: "", snsId: "", link: "" });
    setPosterUrls([]);
    setHashTags([{ id: 1, text: "" }]);
    setDateRange({
      startAt: "",
      endAt: ""
    });
    setGoodsList([
      {
        id: 1,
        title: "",
        items: [{ id: 1, text: "" }]
      }
    ]);
  };

  return (<>
    <StyledEntry>
      <div className="notice">
        <p>장소 등록 시 주의사항</p>
        <p>
          오늘의 컵홀더는 특전 증정이 있는 이벤트에 한해 정보를 제공합니다.
          <br />
          따라서 특전이 없는 포토부스, 옥외 광고 등의 이벤트는 승인되지 않습니다.
        </p>
      </div>

      <div className="inputsWrapper">
        <PlaceInput />
        <ArtistInputContainer />
        <BasicInput
          label="주최자 닉네임"
          value={organizer}
          id="organizer"
          placeholder="오늘의 컵홀더"
          handleInputChange={(e) => handleInputChange(e, "organizer")}
          handleInputDelete={(e) => handleInputDelete(e, "organizer")}
        />
        <BasicInput
          label="주최자 트위터 계정"
          value={snsId}
          id="snsId"
          placeholder="ocup"
          handleInputChange={(e) => handleInputChange(e, "snsId")}
          handleInputDelete={(e) => handleInputDelete(e, "snsId")}
        />
        <DateRangeInput value={dateRange} setValue={setDateRange} />
        <PosterUploader setPosterUrls={setPosterUrls} />
        <HashTagsContainer />
        <BasicInput
          label="이벤트 트윗 링크"
          value={link}
          id="link"
          placeholder="이벤트 정보가 담긴 트윗 링크를 남겨주세요."
          handleInputChange={(e) => handleInputChange(e, "link")}
          handleInputDelete={(e) => handleInputDelete(e, "link")}
        />
        <GoodsInputContainer />
      </div>

      <div className="ctaContainer">
        <Button customStyle={{ width: "100%", fontWeight: "bold" }}>미리보기</Button>
        <Button customStyle={{ width: "100%", fontWeight: "bold" }} handleClick={handleSubmit}>
          제출하기
        </Button>
      </div>
    </StyledEntry>

    {isModalOpen && <Modal setModalOpen={setModalOpen} resetAllStates={resetAllStates} />}
  </>);
};

export default Entry;
