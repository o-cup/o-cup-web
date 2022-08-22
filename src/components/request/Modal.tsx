import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledModalBackground, StyledModal } from "./styles/modalStyle";

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetAllStates: any;
};

const Modal = ({ setModalOpen, setBottomSheetOpen, resetAllStates }: ModalProps) => {
  const navigate = useNavigate();

  const handleClickContinue = () => {
    resetAllStates();
    setModalOpen(false);
    setBottomSheetOpen(false);
  };

  const handleClickFinish = () => {
    navigate("/");
    setModalOpen(false);
    setBottomSheetOpen(false);
  };

  return (<StyledModalBackground>
    <StyledModal>
      <h4>제출 완료!</h4>
      <p>내용 검토 후 1-4일 이내 업로드 됩니다.</p>
      <div className="modalBtnContainer">
        <button type="button" onClick={handleClickContinue}>다른 카페 등록하기</button>
        <button type="button" onClick={handleClickFinish}>메인으로 돌아가기</button>
      </div>
    </StyledModal>
  </StyledModalBackground>);
};

export default Modal;
