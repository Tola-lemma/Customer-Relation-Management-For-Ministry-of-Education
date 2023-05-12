import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorContext } from "./ErrorContext";

export const ErrorMessage = () => {
  const { errorMessage,successMessage, clearError } = useContext(ErrorContext);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 60,
        onClose: clearError,
        theme: "colored",
      });
    }if (successMessage) {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 60,
        onClose: clearError,
        theme: "colored",
      });
    }
  }, [errorMessage, successMessage, clearError]);

  return <ToastContainer />;
};
