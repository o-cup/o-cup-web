import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { requestGoodsListAtom, requestInputsAtom } from "../state/atoms";
import Layout from "../shared/components/layout";
import Entry from "../components/request/Entry";
import PreviewContent from "../components/request/PreviewContent";
import { StyledPreview, StyledRequest } from "../components/request/styles/requestStyle";
import BottomSheet from "../shared/components/BottomSheet";
import useMediaQuery from "../hooks/useMediaQuery";
import { sendReqData } from "../components/request/requestApi";

const Request = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 720px)");

  const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
  const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => sendReqData({ requestInputs, goodsList, setConfirmModalOpen, setAlertOpen });

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

  return (
    <>
      <Layout page="request">
        <StyledRequest>
          <Entry
            isConfirmModalOpen={isConfirmModalOpen}
            setConfirmModalOpen={setConfirmModalOpen}
            isAlertOpen={isAlertOpen}
            setAlertOpen={setAlertOpen}
            setBottomSheetOpen={setBottomSheetOpen}
            handleSubmit={handleSubmit}
            resetAllStates={resetAllStates}
          />
          <StyledPreview>
            <PreviewContent />
          </StyledPreview>
        </StyledRequest>
      </Layout>

      {isMobile && (
        <BottomSheet
          open={isBottomSheetOpen}
          setOpen={setBottomSheetOpen}
          header="미리보기"
          close
          slider
          buttons={{
            title: "제출하기",
            handleClick: handleSubmit,
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
