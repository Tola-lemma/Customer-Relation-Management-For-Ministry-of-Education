import { Button, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../../theme';
const ModalButton = ({editClick,handleDelete}) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
  return (
      <div>
      <button
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={() => {editClick()}}
      className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
    >
      <span>
       <Button style={{ fontSize: "12px",color:colors.primary[700] ,backgroundColor:colors.greenAccent[600]}} > View </Button>
      </span>
    </button>
    <button
      className="btn btn-sm shadow-lg  rounded-pill ms-2"
      onClick={() => {handleDelete()}}
    >
    </button>
    </div>
  )
}

export default ModalButton