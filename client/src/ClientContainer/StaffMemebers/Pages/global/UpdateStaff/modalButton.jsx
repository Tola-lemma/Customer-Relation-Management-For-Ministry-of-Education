import React from 'react'
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton} from "@mui/material";
const ModalButton = () => {
    
  return (
      <div>
       <IconButton
        data-bs-toggle="modal"
        data-bs-target="#UpdateStaff"
       >
        <SettingsOutlinedIcon />
      </IconButton>
    </div>
  )
}

export default ModalButton