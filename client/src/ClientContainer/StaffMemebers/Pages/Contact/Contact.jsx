import { Box,useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../.././theme";
import { mockDataContacts } from "../.././Data/mockData";
import { Header } from "../../Components/Header";
import './contact.css'
import { useReducer } from "react";
import ModalButton from "../../Components/Modals/ModalButton";
import Modal from "../../Components/Modals/modal";
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

export const StaffContact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  
  const handleUpdate = () => {
    // showSuccess("updated successfully")
  }
  const columns = [
    { field: "id", headerName: "ID",flex:0.5},
    {field: "registrarId", headerName: "Registrar ID",},
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
      renderCell: () => {
        return (
          <Box
            width="100%"
            m="0 auto"
            display="flex"
          >
           {<ModalButton  editClick={editClick} />}
          </Box>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Staff Members contacts for future reference" />
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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <Modal
        modalTitle={state.modalTitle}
        fullName={state.fullName}
        contactNumber={state.contactNumber}
        email={state.email}
        role={state.role}
        onUpdate={handleUpdate}
      />
      </Box>
    </Box>
  );
};
