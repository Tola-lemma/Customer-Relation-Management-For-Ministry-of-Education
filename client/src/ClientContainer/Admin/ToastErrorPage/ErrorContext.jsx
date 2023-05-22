import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setwarningMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
  };
  const showWarning = (message) => {
    setwarningMessage(message);
  };

  const clearError = () => {
    setErrorMessage("");
  };

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        successMessage,
        warningMessage,
        showError,
        showSuccess,
        showWarning,
        clearError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
