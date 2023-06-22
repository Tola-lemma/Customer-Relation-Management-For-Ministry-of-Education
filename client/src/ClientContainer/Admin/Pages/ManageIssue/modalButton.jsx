import { useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../../theme';
const ModalButton = ({handleDelete}) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
  return (
    <div>
    <button
      className="btn btn-sm shadow-lg  rounded-pill ms-2"
      onClick={() => {handleDelete()}}
    >
      <span>
        <i
          className="fa-sharp fa-solid fa-trash"
          style={{ fontSize: "16px",color:colors.primary[100] }}
        ></i>
      </span>
    </button>
    </div>
  )
}

export default ModalButton