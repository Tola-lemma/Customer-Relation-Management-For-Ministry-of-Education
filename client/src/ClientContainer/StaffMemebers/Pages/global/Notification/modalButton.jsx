import React from 'react'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { IconButton,Badge} from "@mui/material";
const ModalButtonNotification = ({todoCount}) => {
    
  return (
      <div>
       <IconButton
        data-bs-toggle="modal"
        data-bs-target="#notification"
       >
        <Badge badgeContent={todoCount} color="info">
        <NotificationsOutlinedIcon />
      </Badge>
      </IconButton>
    </div>
  )
}

export default ModalButtonNotification