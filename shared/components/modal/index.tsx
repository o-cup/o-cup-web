import React, { useEffect } from "react";
import { StyledModalBackground, StyledModal } from "./modalStyle";

type ModalProps = {
	children: React.ReactNode;
	maxWidth: number;
	minWidth: number;
};

const Modal = ({ children, maxWidth, minWidth }: ModalProps) => {
	useEffect(() => {
		document.body.classList.add("fixed");

		return () => {
			document.body.classList.remove("fixed");
		};
	}, []);

	return (
		<StyledModalBackground>
			<StyledModal maxWidth={maxWidth} minWidth={minWidth}>
				{children}
			</StyledModal>
		</StyledModalBackground>
	);
};

export default Modal;
