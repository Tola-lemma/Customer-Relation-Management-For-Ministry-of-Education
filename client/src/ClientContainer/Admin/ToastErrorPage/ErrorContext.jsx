import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showError = (errorMessage) => {
    setMessage({ type: "error", message: errorMessage });
  };

  const showSuccess = (successMessage) => {
    setMessage({ type: "success", message: successMessage });
  };

  const showWarning = (warningMessage) => {
    setMessage({ type: "warning", message: warningMessage });
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <ErrorContext.Provider
      value={{
        message,
        showError,
        showSuccess,
        showWarning,
        clearMessage,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
