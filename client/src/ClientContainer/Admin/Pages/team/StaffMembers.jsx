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
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await mockDataTeam();
      setUserData(data);
    };

    fetchData();
  }, []);
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
    { field: "id", headerName: "ID" ,flex:0.1},
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
      renderCell: () => {
        return (
          <Box
            width="100%"
            m="0 auto"
            display="flex"
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
        <DataGrid checkboxSelection rows={userData} columns={columns} />
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
