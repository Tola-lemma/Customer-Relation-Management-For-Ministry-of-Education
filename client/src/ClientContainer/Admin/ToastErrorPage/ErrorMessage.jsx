import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorContext } from "./ErrorContext";

export const ErrorMessage = () => {
  const { message, clearMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (message) {
      const { type, message: toastMessage } = message;

      const toastOptions = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 60,
        onClose: clearMessage,
        theme: "colored",
      };

      switch (type) {
        case "error":
          toast.error(toastMessage, toastOptions);
          break;
        case "success":
          toast.success(toastMessage, toastOptions);
          break;
        case "warning":
          toast.warn(toastMessage, toastOptions);
          break;
        default:
          break;
      }
    }
  }, [message, clearMessage]);

  return <ToastContainer limit={1}/>;
};
