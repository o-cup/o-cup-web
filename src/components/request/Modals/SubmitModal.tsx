import React from "react";
import { StyledRequestModal } from "../styles/requestStyle";
import Modal from "../../../shared/components/Modal";

type ModalProps = {
	handleClickContinue: () => void;
	handleClickFinish: () => void;
};

const SubmitModal = ({ handleClickContinue, handleClickFinish }: ModalProps) => (
	<Modal maxWidth={340} minWidth={340}>
		<StyledRequestModal>
			<h4>제출 완료!</h4>
			<p>내용 검토 후 1-4일 이내 업로드 됩니다.</p>
			<div className="modalBtnContainer">
				<button type="button" onClick={handleClickContinue}>
					다른 카페 등록하기
				</button>
				<button type="button" onClick={handleClickFinish}>
					메인으로 돌아가기
				</button>
			</div>
		</StyledRequestModal>
	</Modal>
);

export default React.memo(SubmitModal);
