import React from "react";
import { CircularProgress } from "@mui/material";

const CustomButton = ({ onClick, disabled, loading, children,className  }) => {
  return (
    <button className={`btn ${className} `} disabled={disabled || loading} onClick={onClick}>
      {loading ? (
        <>
          <CircularProgress size={20} color="inherit" />
          <span style={{ marginLeft: "8px" }}>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
