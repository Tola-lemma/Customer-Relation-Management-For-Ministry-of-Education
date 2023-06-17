import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { TextField } from "@mui/material";

const Modal = ({ modalTitle, selectedRow, onUpdate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { name, email, phone, createdAt,issueDescription  } = selectedRow || {};

  const [reply, setReply] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);

  const handleReplyClick = () => {
    setShowTextArea(true);
  };

  const handleSend = () => {
    // Logic to send the reply
    // ...
    setShowTextArea(false);
    setReply("");
  };

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
            <p>Created At: {createdAt}</p>

            <div style={{ marginTop: "20px" }}>
              <p><strong>Issue Description:</strong></p>
              <div className="shadow-lg" style={{fontSize:"3rem"}}>
               {issueDescription}
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {showTextArea ? (
                <div style={{ flex: 1 }}>
                  <TextField
                    label="Reply"
                    multiline
                    rows={4}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    fullWidth
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.primary[400],
                    }}
                  />
                  <button
                    className="btn btn-primary rounded-pill mt-3"
                    onClick={handleSend}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={handleReplyClick}
                    style={{ marginRight: "10px" }}
                  >
                    Reply
                  </button>
                  <button className="btn btn-primary rounded-pill">
                    Progress
                  </button>
                  <button
                    className="btn btn-primary rounded-pill"
                    style={{ marginLeft: "10px" }}
                  >
                    Done
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
