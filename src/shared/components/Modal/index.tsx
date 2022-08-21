import React from "react";
import { StyledModalBackground } from "../../../components/request/styles/modalStyle";
import { StyledModal } from "./modalStyle";

type ModalProps = {
	children: React.ReactNode;
	handleClose: () => void;
};

const Modal = ({ children, handleClose }: ModalProps) => (
	<StyledModalBackground onClick={handleClose}>
		<StyledModal>{children}</StyledModal>
	</StyledModalBackground>
);

export default Modal;
