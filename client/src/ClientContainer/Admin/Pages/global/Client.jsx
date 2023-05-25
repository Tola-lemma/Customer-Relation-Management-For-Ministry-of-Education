import { IconButton, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext} from '../../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
export const Client = () => {
      const theme = useTheme();
      const colorMode = useContext(ColorModeContext);
  return (
    <div>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
    </div>
  )
}
