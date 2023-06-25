import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Admin/Pages/global/LoginContext";
import ModalButton from "./UpdateStaff/modalButton";
import Modal from "./UpdateStaff/modal";
import axios from "axios";
import ModalButtonNotification from "./Notification/modalButton";
import ModalNotification from "./Notification/modal";
export const StaffTopbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate( )
  const hadleLogout= ()=>{
     logout();
    localStorage.setItem("token", "")
       navigate("/login")
  }
  const [todoCount, setTodoCount] = useState(0);
  const [todoIssues, setTodoIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/issue/requested-issues',
        {
          headers: {
         'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        });
        const { requestedIssues } = response.data;
        const todoIssues = requestedIssues.filter(issue => issue.issueStatus === 'todo');
        setTodoIssues(todoIssues);
        setTodoCount(todoIssues.length);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
    {/* SEARCH BAR */}
    <Box
      display="flex"
      backgroundColor={colors.primary[400]}
      borderRadius="3px"
    >
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>

    {/* ICONS */}
    <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      <ModalButtonNotification todoCount={todoCount}/>
      <ModalNotification todoIssues={todoIssues} />
      <ModalButton />
      <Modal />
      <IconButton onClick={()=>hadleLogout()} >
        <LogoutIcon />
      </IconButton>
    </Box>
  </Box>
  )
}
