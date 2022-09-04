import React, { Dispatch, SetStateAction } from "react";
import Modal from "../../../shared/components/Modal";
import { StyledRequestModal } from "../styles/requestStyle";

type ModalProps = {
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertModal = ({ setAlertOpen }: ModalProps) =>
  <Modal width={340}>
    <StyledRequestModal>
      <p>*표시 항목은 필수 입력 항목입니다.</p>
      <div className="modalBtnContainer">
        <button className="alertBtn"
                type="button" onClick={() => setAlertOpen(false)}>확인
        </button>
      </div>
    </StyledRequestModal>
  </Modal>;

export default AlertModal;
