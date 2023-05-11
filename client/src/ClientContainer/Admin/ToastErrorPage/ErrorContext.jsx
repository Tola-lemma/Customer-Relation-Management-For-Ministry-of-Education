import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
  };

  const clearError = () => {
    setErrorMessage("");
  };

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        successMessage,
        showError,
        showSuccess,
        clearError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
