import React, { Dispatch, SetStateAction, useEffect } from "react";
import { StyledToast } from "./toastStyle";

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
    </StyledToast>);
};


export default Toast;
