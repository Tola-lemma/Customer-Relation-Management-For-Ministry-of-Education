import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../.././theme";
import { mockDataTeam } from "../.././data/mockData";
import { Header } from "../../components/Header";
import {  useContext, useEffect, useReducer, useState} from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
import Modal from "../../components/Modals/modal";
import ModalButton from "../../components/Modals/modalButton";
import axios from "axios";
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
        modalTitle: "Update Staff Member's role",
        selectedRow: action.payload.selectedRow,
      };
    default:
      return;
  }
};

export const StaffMembers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showWarning,showError} = useContext(ErrorContext);
  const [userData, setUserData] = useState([]);
  const fetchData = async () => {
    const data = await mockDataTeam();
    setUserData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
//update purpose
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    selectedRow: null
  });
  const editClick = (row) => {
    dispatch({
      type: "UPDATE_STAFF",
      payload: {
        selectedRow: row,
        modalTitle: state.modalTitle,
      },
    });
  };
  
  const handleDelete = async (row) => {
    const userId = row.userId;
    if (userId) {
      try {
        const response = await axios.delete(`/admin/delete-account/${userId}`,
          { headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },});
        showWarning("Customers Account deleted successfully!"||response?.msg)
        await fetchData();
      } catch (error) {
        showError(error||"Error while deleting")
      }
    }
  }; 
  
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
            width="100%"
            m="0 auto"
            display="flex"
          >
            <Typography color={colors.grey[100]} >
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
      renderCell: (params) => {
        const row = params.row;
        return (
          <Box width="100%" m="0 auto" display="flex">
            <ModalButton editClick={() => editClick(row)} handleDelete={()=>handleDelete(row)} />
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
        <DataGrid checkboxSelection rows={userData} columns={columns} />
      </Box>
       
{/* update staff modal */}
<Modal
  modalTitle={state.modalTitle}
  selectedRow={state.selectedRow}
/>

      <ErrorMessage />
    </Box>
  );
};
