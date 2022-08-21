import React from "react";
import { StyledModalBackground } from "../../../components/request/styles/modalStyle";
import { StyledModal } from "./modalStyle";

type ModalProps = {
	children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => (
	<StyledModalBackground>
		<StyledModal>{children}</StyledModal>
	</StyledModalBackground>
);

export default Modal;
