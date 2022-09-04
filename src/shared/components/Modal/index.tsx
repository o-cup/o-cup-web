import React, { useEffect } from "react";
import { StyledModalBackground, StyledModal } from "./modalStyle";

type ModalProps = {
	children: React.ReactNode;
	width?: number;
};

const Modal = ({ children, width }: ModalProps) => {
	useEffect(() => {
		document.body.classList.add("fixed");

		return () => {
			document.body.classList.remove("fixed");
		};
	}, []);

	return (
		<StyledModalBackground>
			<StyledModal width={width || 380}>{children}</StyledModal>
		</StyledModalBackground>
	);
};

Modal.defaultProps = {
	width: 380,
};

export default Modal;
