

import React from "react";


import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import download from "downloadjs";

const Modal = ({ modalTitle, selectedRow, onUpdate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    _id,
    name,
    email,
    phone,
    createdAt,
    issueDescription,
    files,
  } = selectedRow || {};

  const [showTextArea, setShowTextArea] = useState(false);
  const [moreButton,setMoreButton] = useState(false);
  const [status,setStatus] = useState("")
  const handleReplyClick = () => {
    setShowTextArea(true);
  
  };

  const handleSend = async(e) => {
    // setShowTextArea(false);
    const requestIssueId = _id
    try {
      const {data : {msg}} = await axios.put(`/issue/update/${requestIssueId}`, {
        status
      },  {
        headers: {
       'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      alert(`success ${msg}`)
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewPDF = async (filename, originalname) => {
    try {
      const response = await axios.get(`/issue/stream/${filename}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      const newTab = window.open("", "_blank");
      newTab.document.write(
        `<iframe src="${fileURL}" width="100%" height="100%" style="border: none;"></iframe>`
      );
      newTab.document.title = originalname;
    } catch (error) {
      alert(error?.response?.data?.msg || "Error while viewing PDF");
    }
  };

  const handleDownload = async (filename, originalname) => {
    try {
      const response = await axios.get(`/issue/stream/${filename}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      download(response.data, originalname);
    } catch (error) {
      alert(error?.response?.data?.msg || "Error while downloading file");
    }
  };
const openButton = ()=>{
  setMoreButton(true);
}
const closeMoreButton =()=>{
  setMoreButton(false);
}
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h4 className="modal-title ms-5">{modalTitle}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body" style={{ color: colors.primary[600] }}>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Issue Created on: {createdAt}</p>
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Issue Description:</strong>
              </p>
              <div className="shadow-lg ml-2 mt-2" style={{ fontSize: "1rem" }}>
                {issueDescription}
              </div>
            </div>
            <div className="mt-3" style={{ textAlign: "center" }}>
               {!moreButton ?  (
                <div>
                    <button
                      style={{ width: "30%" }}
                      className="btn btn-warning rounded-pill"
                      onClick={openButton}
                    >
                      Download File
                    </button>
                    <button
                      style={{ width: "30%", marginLeft: "1rem" }}
                      className="btn btn-primary rounded-pill"
                      onClick={openButton}
                    >
                      View File
                    </button>
                    </div>

               ):(
                <>
                {files && files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index}>
                    <p>{ }</p>
                    <button
                      style={{ width: "30%" }}
                      className="btn btn-warning rounded-pill"
                      onClick={() => handleDownload(file.filename, file.originalname)}
                    >
                      Download File {index + 1}
                    </button>
                    <button
                      style={{ width: "30%", marginLeft: "1rem" }}
                      className="btn btn-primary rounded-pill"
                      onClick={() => handleViewPDF(file.filename, file.originalname)}
                    >
                      View File {index + 1}
                    </button>
                  </div>
                ))
              ) : (
                <p style={{color:"red"}}>No files available</p>
              )}
              <button onClick={closeMoreButton} className="btn btn-info rounded-pill">Hide</button>
              </>
               )}
            </div>
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {showTextArea ? (
                <div style={{ flex: 1 }}>
                  <textarea
                    style={{ width: "100%", height: "auto", minHeight: "75px" }}
                    rows={3}
                    placeholder={`Write your reply message to ${name} here...`}
                  />
                  <select className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option selected>Update the Status of the issue</option>
                    <option value="progress">Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button
                    className="btn btn-success rounded-pill mt-3"
                    onClick={handleSend}
                    style={{
                      width: "30%",
                      // marginTop  : "60%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <button
                    className="btn btn-success rounded-pill"
                    onClick={handleReplyClick}
                    style={{ width: "100%" }}
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
