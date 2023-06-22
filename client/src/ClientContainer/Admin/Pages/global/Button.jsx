import React from "react";
import { CircularProgress } from "@mui/material";

const CustomButton = ({ onClick, disabled, loading, children,className,style  }) => {
  return (
    <button className={`btn ${className} `} disabled={disabled || loading} onClick={onClick} style={style}>
      {loading ? (
        <>
          <CircularProgress size={25} color="inherit" />
          <span style={{ marginLeft: "8px" }}>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
