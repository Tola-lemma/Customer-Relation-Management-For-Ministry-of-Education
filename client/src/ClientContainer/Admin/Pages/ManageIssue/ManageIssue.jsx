import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../.././theme";
import { mockDataManageIssue } from "../.././data/mockData";
import { Header } from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
import axios from "axios";
import {
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ModalButton from "./modalButton";

export const ManageIssue = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showWarning, showError } = useContext(ErrorContext);
  const [userData, setUserData] = useState([]);
  const fetchData = async () => {
    const data = await mockDataManageIssue();
    setUserData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [inputMatch, setInputMatch] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const handleDelete = async (row) => {
    const userId = row.userId;
    if (userId) {
      setDeleteUserId(userId);
      setIsDeleteModalOpen(true);
    }
  };
  const confirmDelete = async () => {
    if (confirmInput.toLowerCase() === "delete") {
      try {
        const response = await axios.delete(
          `/admin/delete/${deleteUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showWarning(
          response?.msg || "Customer's account deleted successfully!"
        );
        await fetchData();
      } catch (error) {
        showError(error?.response?.data?.msg || "Error while deleting");
      }
    } else {
      showError("Invalid input. Deletion canceled.");
    }
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setInputMatch(confirmInput.toLowerCase() === "delete");
  }, [confirmInput]);

  //table
  const columns = [
//     { field: "id", headerName: "S.N" ,flex:0.1},
    { field: "ticketNumber", headerName: "Ticket Number" ,flex:1},
    {
      field: "name",
      headerName: "Full Name",
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
      field: "serviceType",
      headerName: "Service Type",
      flex: 1,
      // renderCell: ({ row: { role } }) => {
      //   return (
      //     <Box width="100%" m="0 auto" display="flex">
      //       <Typography color={colors.grey[100]}>{role}</Typography>
      //     </Box>
      //   );
      // },
    },
    {
      field: "issueStatus",
      headerName: "Issue Status",
      flex: 1,
    },
    //update
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Box width="100%" m="0 auto" display="flex">
            <ModalButton
              handleDelete={() => handleDelete(row)}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Manage Customer Issue" subtitle="Admin can Manage Customer Issue" />
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
        <DataGrid rows={userData} columns={columns} />
      </Box>

      {/* confirmation windows */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            <strong> Are you sure you want to delete? </strong>
          </Typography>
          <TextField
            style={{ marginTop: "1rem" }}
            label="Enter 'DELETE' to confirm"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            style={{ backgroundColor: colors.grey[300] }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            autoFocus
            disabled={!inputMatch}
            style={{ backgroundColor: colors.grey[300] }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ErrorMessage />
    </Box>
  );
};
