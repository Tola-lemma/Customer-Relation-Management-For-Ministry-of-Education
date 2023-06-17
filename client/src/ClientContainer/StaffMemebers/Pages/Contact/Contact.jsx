import { Box,useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../.././theme";
import { mockDataContacts } from "../.././Data/mockData";
import { Header } from "../../Components/Header";
import './contact.css'
import Modal from "../../../StaffMemebers/Components/Modals/modal";
import ModalButton from "../../../StaffMemebers/Components/Modals/ModalButton";
import { useEffect, useReducer, useState } from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STAFF":
      return {
        ...state,
        modalTitle: "Views of Customer Detail",
        selectedRow: action.payload.selectedRow,
      };
    default:
      return;
  }
};

export const StaffContact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [state, dispatch] = useReducer(reducer, {
    modalTitle: "",
    selectedRow: null,
  });
  const editClick = (row) => {
    dispatch({
      type: "UPDATE_STAFF",
      payload: {
        selectedRow: row,
      },
    });
  };
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await mockDataContacts();
      setUserData(data);
    };

    fetchData();
  }, []);
  const handleUpdate = () => {
    // showSuccess("updated successfully")
  }
  const columns = [
    { field: "id", headerName: "ID",flex:0.1},
    {field: "createdAt", headerName: "Issue Created on", flex:1},
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
      field:"action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Box width="100%" m="0 auto" display="flex">
            <ModalButton editClick={() => editClick(row)} />
          </Box>
        );
      },
    }
  ];


  return (
    <Box m="20px">
      <Header title="Manage Customers" subtitle="List of customers that request the service" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          }
        }}
      >
        <DataGrid
          rows={userData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <Modal
          modalTitle={state.modalTitle}
          selectedRow={state.selectedRow}
          onUpdate={handleUpdate}
        />
      </Box>
    </Box>
  );
};
