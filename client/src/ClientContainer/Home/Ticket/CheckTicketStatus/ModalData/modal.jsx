import { useTheme } from "@mui/material";
import { tokens } from "../../../../Admin/theme";

const Modal = ({ requestedIssue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { name, serviceType, issueStatus } = requestedIssue;
  return (
    <div
      className="modal fade"
      id="TicketStatusModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h3 className="modal-title">{name ? `Dear ${name},` : <h3 style={{color:"red"}}>Oops! Error Occured</h3>}</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body " style={{ color: colors.primary[600] }}>
           { (name && issueStatus && serviceType) ? 
           (<div className="shadow-sm" style={{fontSize:"1rem"}}> 
           <p>We wanted to provide you with an update regarding the status of your
            issue.Our team has been actively working on resolving your concern,
            and we are pleased to inform you that the current status of your
            issue is <b>{issueStatus}.</b>
            We understand the importance of addressing your <b>{serviceType} </b>in a timely manner and ensuring that it receives
            the necessary attention. 
            Thank you for placing your trust in our
            organization. </p>
            <p>We remain committed to delivering a positive outcome
            and meeting your expectations.</p> 
                  <p>Best regards,</p> 
                  <p>CRM Support Team!.</p></div> )
           
           :<h2 style={{color:"red"}}>Please correctly enter your email and tickect number to track your issue</h2> }
           
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning rounded-pill"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
