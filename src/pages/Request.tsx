import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { requestGoodsListAtom, requestInputsAtom } from "../state/atoms";
import Layout from "../shared/components/layout";
import Entry from "../components/request/Entry";
import PreviewContent from "../components/request/PreviewContent";
import { StyledPreview, StyledRequest, StyledCheckEvent } from "../components/request/styles/requestStyle";
import BottomSheet from "../shared/components/BottomSheet";
import useMediaQuery from "../hooks/useMediaQuery";
import { sendReqData } from "../components/request/requestApi";
import ConfirmModal from "../components/request/Modals/ConfirmModal";
import SubmitModal from "../components/request/Modals/SubmitModal";
import AlertModal from "../components/request/Modals/AlertModal";
import PlaceInput from "../components/request/Place/PlaceInput";
import DateRangeInput from "../components/request/DateRange/DateRangeInput";
import Button from "../shared/components/Button";
import { fetchDuplicatedEvent } from "../apis";
import { EventType } from "../types";
import DuplicatedModal from "../components/request/Modals/DuplicatedModal";

const Request = () => {
  const navigate = useNavigate();

  const [isChecked, setChecked] = useState(false); // 페이지 라우팅 역할
  const [isDuplicatedEventOpen, setDuplicatedEventOpen] = useState(false);
  const [duplicatedEventData, setDuplicatedEventData] = useState({} as EventType);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 720px)");

  const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
  const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);

  const handleSubmit = () =>
    sendReqData({
      requestInputs,
      goodsList,
      setSubmitModalOpen,
      setAlertOpen,
    });

  const resetAllStates = () => {
    setRequestInputs({
      place: { place: "", district: "", address: "", newDistrict: { code: "", name: "" } },
      artist: [
        { id: 1, peopleId: 0, bias: "", team: "" },
      ],
      organizer: "",
      snsId: "",
      link: "",
      posterUrls: [
        { id: 1, publicUrl: "" },
      ],
      hashTags: [
        { id: 1, text: "" },
      ],
      dateRange: { startAt: "", endAt: "" },
      goods: {},
    });
    setGoodsList([
      {
        id: 1,
        key: "",
        title: "",
        items: [{ id: 1, text: "" }],
      },
    ]);
    setChecked(false);
    setDuplicatedEventOpen(false);
    setDuplicatedEventData({} as EventType);
  };

  const handleClickContinue = () => {
    resetAllStates();
    setSubmitModalOpen(false);
    setBottomSheetOpen(false);
    window.scrollTo(0, 0);
  };

  const handleClickFinish = () => {
    navigate("/");
    setChecked(false);
    setSubmitModalOpen(false);
    setBottomSheetOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      // 이벤트 등록 session 정보 초기화
      resetAllStates();
      sessionStorage.clear();
    };
  }, []);

  const checkDuplicate = () => {
    fetchDuplicatedEvent({ place: requestInputs.place.place, dateRange: requestInputs.dateRange })
      .then((res) => {
        console.log(res);
        if (res) {
          setDuplicatedEventOpen(true);
          setDuplicatedEventData(res);
        } else {
          // 중복검사 통과
          window.scrollTo(0, 0);
          setChecked(true);
        }
      });
  };

  if (!isChecked) {
    return (<>
      <Layout page="duplicate">
        <StyledRequest>
          <StyledCheckEvent>
            <div className="checkNotice">
              <img src="/images/pin.png" alt="pin" />
              <p>
                이미 등록된 이벤트일 수도 있어요.<br />
                이벤트 등록 전, 중복 확인 먼저 해주세요.
              </p>
            </div>
            <PlaceInput />
            <DateRangeInput />
            <div
              className={`btnContainer ${(requestInputs.place.place && requestInputs.dateRange.startAt && requestInputs.dateRange.endAt) ? "" : "disabled"}`}>
              <Button customStyle={{ width: "100%", fontWeight: "bold", marginTop: "32px" }}
                      handleClick={checkDuplicate}>
                중복 확인하기
              </Button>
            </div>
          </StyledCheckEvent>
        </StyledRequest>
      </Layout>

      {isDuplicatedEventOpen && <DuplicatedModal duplicatedEventData={duplicatedEventData} resetAllStates={resetAllStates}/>}
    </>);
  }
  return (
    <>
      <Layout page="request">
        <StyledRequest>
          <Entry
            setConfirmModalOpen={setConfirmModalOpen}
            setBottomSheetOpen={setBottomSheetOpen}
          />
          <StyledPreview>
            <PreviewContent />
          </StyledPreview>
        </StyledRequest>
      </Layout>

      {isConfirmModalOpen &&
        <ConfirmModal setConfirmModalOpen={setConfirmModalOpen} handleSubmit={handleSubmit} />}

      {isSubmitModalOpen &&
        <SubmitModal handleClickContinue={handleClickContinue} handleClickFinish={handleClickFinish} />}

      {isAlertOpen && <AlertModal setAlertOpen={setAlertOpen} />}

      {isMobile && (
        <BottomSheet
          open={isBottomSheetOpen}
          setOpen={setBottomSheetOpen}
          header="미리보기"
          close
          slider
          buttons={{
            title: "제출하기",
            handleClick: () => setConfirmModalOpen(true),
          }}
        >
          <div>
            <PreviewContent />
          </div>
        </BottomSheet>
      )}
    </>
  );
};

export default Request;
