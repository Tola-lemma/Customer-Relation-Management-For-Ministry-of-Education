import React, { useContext, useState } from 'react'
import { Header } from '../../Components/Header'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../Components/StatBox";
import { UserContext } from '../../../Admin/Pages/global/LoginContext';
import Scholarship from '../../Reports/Scholarship/Scholarship';
import Transfer from '../../Reports/TransferRequest/Transfer';
import StudyAbroad from '../../Reports/StudyAbroad/StudyAbroad';
import Complaint from '../../Reports/Complaints/Complaint';

export const StaffDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(UserContext);
  const [scholarshipModal,setScholarshipModal] = useState(false);
  const [transferModal,setTransferModal] = useState(false);
  const [studyAbroadModal,setStudyAbroadModal] = useState(false);
  const [complaintModal,setCompplaintModal] = useState(false);

  const handleGenerateReport = () => {
    if (user.role === "transferCoordinator") {
      openTransferModal();
    } else if (user.role === "scholarshipCoordinator") {
      openScholarshipModal();
    } else if (user.role === "studyAbroadCoordinator") {
      openStudyAbroadModal();
    } else if (user.role === "complaintsCoordinator") {
      openComplaintModal();
    }
  };
  
  const openScholarshipModal =()=>{
    setScholarshipModal(true)
  }
  const closeScholarshipModal =()=>{
    setScholarshipModal(false)
  }
  const openTransferModal = () => {
    setTransferModal(true)
  }
  const closeTransferModal = () => {
    setTransferModal(false)
  }
  const openStudyAbroadModal =()=>{
    setStudyAbroadModal(true)
  }
  const closeStudyAbroadModal =()=>{
    setStudyAbroadModal(false)
  }
  const openComplaintModal = () =>{
    setCompplaintModal(true)
  }
  const closeComplaintModal = () =>{
    setCompplaintModal(false)
  }
  return (
    <Box m="20px">
        {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleGenerateReport}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Generate Report
          </Button>
        </Box>
      </Box>
            {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="361"
            subtitle="Notify via Email"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="Email Sent"
            progress="0.85"
            increase="+90%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="441"
            subtitle="Incoming Resquests"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="441"
            subtitle="Update Issue Status"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2  for specific report*/}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Download Report
                <hr/>
              </Typography>
            </Box>
           {user.role==="transferCoordinator" && <Box display="flex " justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[200]}
              >
                Student Transfer
              </Typography>
              <IconButton>
                <DownloadOutlinedIcon
                 onClick={openTransferModal}
                  sx={{ fontSize: "29px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> }
            {user.role==="transferCoordinator" && <><Box display="flex " justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[200]}
              >
                Teacher Transfer
              </Typography>
              <IconButton>
                <DownloadOutlinedIcon
                 onClick={openTransferModal}
                  sx={{ fontSize: "29px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <p style={{fontSize:"1rem" ,fontStyle:"italic"}}>To access and download the report, simply press the 'Download' button. Once downloaded, you can analyze the report and gain valuable insights.</p>
            </>}
           {user.role==="scholarshipCoordinator" && <> <Box display="flex " justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[200]}
              >
                Scholarship Question
              </Typography>
              <IconButton>
                <DownloadOutlinedIcon
                onClick={openScholarshipModal}
                  sx={{ fontSize: "29px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <p style={{fontSize:"1rem" ,fontStyle:"italic"}}>To access and download the report, simply press the 'Download' button. Once downloaded, you can analyze the report and gain valuable insights.</p>
        </>
            }
           {user.role==="studyAbroadCoordinator" &&<> <Box display="flex " justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[200]}
              >
                A request to return to work after completing their studies abroad
              </Typography>
              <IconButton>
                <DownloadOutlinedIcon
                 onClick={openStudyAbroadModal}
                  sx={{ fontSize: "29px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <p style={{fontSize:"1rem" ,fontStyle:"italic"}}>To access and download the report, simply press the 'Download' button. Once downloaded, you can analyze the report and gain valuable insights.</p>
            </>}
            {user.role==="complaintsCoordinator" &&<> <Box display="flex " justifyContent="space-between">
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[200]}
              >
                Various academic and administrative complaints
              </Typography>
              <IconButton>
                <DownloadOutlinedIcon
                 onClick={openComplaintModal}
                  sx={{ fontSize: "29px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <p style={{fontSize:"1rem" ,fontStyle:"italic"}}>To access and download the report, simply press the 'Download' button. Once downloaded, you can analyze the report and gain valuable insights.</p>
            </>}
          </Box>
          </Box>
          <Scholarship  title="Scholarship Reports" scholarshipModal={scholarshipModal} closeScholarshipModal={closeScholarshipModal} />
          <Transfer  title="Transfer Reports" transferModal={transferModal} closeTransferModal={closeTransferModal} />
          <StudyAbroad  title="Request to return to work after studying abroad" studyAbroadModal={studyAbroadModal} closeStudyAbroadModal={closeStudyAbroadModal} />
          <Complaint  title="Complaint Reports" complaintModal={complaintModal} closeComplaintModal={closeComplaintModal} />
          </Box>
    </Box>
  )
}
