import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { requestGoodsListAtom, requestInputsAtom } from "../state/atoms";
import Layout from "../shared/components/layout";
import Entry from "../components/request/Entry";
import PreviewContent from "../components/request/PreviewContent";
import { StyledPreview, StyledRequest } from "../components/request/styles/requestStyle";
import BottomSheet from "../shared/components/BottomSheet";
import useMediaQuery from "../hooks/useMediaQuery";
import { sendReqData } from "../components/request/requestApi";
import ConfirmModal from "../components/request/Modals/ConfirmModal";
import SubmitModal from "../components/request/Modals/SubmitModal";
import AlertModal from "../components/request/Modals/AlertModal";

const Request = () => {
  const navigate = useNavigate();

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
      place: { place: "", district: "", address: "" },
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
  };

  const handleClickContinue = () => {
    resetAllStates();
    setSubmitModalOpen(false);
    setBottomSheetOpen(false);
    window.scrollTo(0, 0);
  };

  const handleClickFinish = () => {
    navigate("/");
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
