import React, { Dispatch, SetStateAction } from "react";
import { StyledRequestModal } from "../styles/requestStyle";
import Modal from "../../../shared/components/Modal";
import { LoadingSpinnerWrapper } from "../../../shared/components/Loading/loadingStyle";

type ModalProps = {
	isLoading: boolean;
	setConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
	handleSubmit: () => void;
};

const ConfirmModal = ({ isLoading, setConfirmModalOpen, handleSubmit }: ModalProps) => (
	<Modal maxWidth={340} minWidth={340}>
		<StyledRequestModal>
			<p>이대로 제출할까요?</p>
			<div className="modalBtnContainer">
				{isLoading ? (
					<LoadingSpinnerWrapper>
						<div />
						<div />
						<div />
						<div />
					</LoadingSpinnerWrapper>
				) : (
					<>
						<button type="button" onClick={() => setConfirmModalOpen(false)}>
							취소하기
						</button>
						<button type="button" onClick={handleSubmit}>
							제출하기
						</button>
					</>
				)}
			</div>
		</StyledRequestModal>
	</Modal>
);

export default React.memo(ConfirmModal);
