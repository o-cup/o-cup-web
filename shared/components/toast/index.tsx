import React, { useEffect } from "react";
import { StyledToast } from "./toastStyle";
import type { Dispatch, SetStateAction } from "react";

type ToastProps = {
	text: string;
	setToast: Dispatch<SetStateAction<boolean>>;
};

const Toast = ({ text, setToast }: ToastProps) => {
	useEffect(() => {
		setTimeout(() => {
			setToast(false);
		}, 3000);
	}, []);

	return (
		<StyledToast>
			<p>{text}</p>
		</StyledToast>
	);
};

export default Toast;
