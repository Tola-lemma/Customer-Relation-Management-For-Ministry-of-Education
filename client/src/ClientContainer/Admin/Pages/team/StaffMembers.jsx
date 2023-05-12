import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../.././theme";
import { mockDataTeam } from "../.././data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Header } from "../../components/Header";

import {  useContext, useReducer} from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
import Modal from "../../components/Modals/modal";
import ModalButton from "../../components/Modals/modalButton";
 const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN":
      return {
        ...state,
        modalTitle: "Update Admin",
        FullName: action.payload.FullName,
      };

    case "UPDATE_STAFF":
      return {
        ...state,
        modalTitle: "Update Staff Members",
        FullName: action.payload.FullName,
        Email: action.payload.Email,
        ContactNumber: action.payload.ContactNumber,
        Role: action.payload.Role,
      };
    default:
      return;
  }
};

export const StaffMembers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showWarning,showSuccess } = useContext(ErrorContext);
//update purpose
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    FullName: "",
    Email: "",
    ContactNumber: "",
    Role:""
  });
  const editClick = () => {
    dispatch({
      type: "UPDATE_STAFF",
      payload: {
        modalTitle: state.modalTitle,
      },
    });
  };
  
  const handleDelete = () => {
    showWarning("Deleted successfully")
  }
  const handleUpdate = () => {
    showSuccess("updated successfully")
  }
//table
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "Teacher Transfer"
                ? colors.greenAccent[600]
                : role === "Sholarship"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "Teacher Transfer" && <AdminPanelSettingsOutlinedIcon />}
            {role === "Sholarship" && <SecurityOutlinedIcon />}
            {role === "Student Transfer" && <SecurityOutlinedIcon />}
            {role === "Complaint" && <LockOpenOutlinedIcon />}
            {role === "studied Abroad" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    //update
    {
      field:"action",
      headerName: "Actions",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
           {<ModalButton  editClick={editClick}  handleDelete={handleDelete}/>}
          </Box>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="STAFF MEMBERS" subtitle="Managing the Staff Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
       
{/* update staff modal */}
       <Modal
        modalTitle={state.modalTitle}
        fullName={state.fullName}
        contactNumber={state.contactNumber}
        email={state.email}
        role={state.role}
        onUpdate={handleUpdate}
      />
      <ErrorMessage />
    </Box>
  );
};
