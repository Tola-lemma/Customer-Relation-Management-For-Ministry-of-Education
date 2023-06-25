import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate }from "react-router-dom"
import { UserContext } from "./LoginContext";
import ModalButton from "./UpdateAdmin/modalButton";
import Modal from "./UpdateAdmin/modal";
import axios from "axios";
import ModalNotification from "../../../StaffMemebers/Pages/global/Notification/modal";
import ModalButtonNotification from "../../../StaffMemebers/Pages/global/Notification/modalButton";
export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
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
        const response = await axios.get('/admin/requested-issues',
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
        console.error('Error fetching data:', error);
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
      <IconButton onClick={()=>hadleLogout()}>
        <LogoutIcon />
      </IconButton>
    </Box>
  </Box>
  )
}
