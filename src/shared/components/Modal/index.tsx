import React, { useEffect } from "react";
import { StyledModalBackground } from "../../../components/request/styles/modalStyle";
import { StyledModal } from "./modalStyle";

type ModalProps = {
	children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
	useEffect(() => {
		document.body.classList.add("fixed");

		return () => {
			document.body.classList.remove("fixed");
		};
	}, []);

	return (
		<StyledModalBackground>
			<StyledModal>{children}</StyledModal>
		</StyledModalBackground>
	);
};

export default Modal;
