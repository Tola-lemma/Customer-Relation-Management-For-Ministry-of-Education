

import { useTheme } from "@emotion/react";
import { ErrorMessage } from "../../../../Admin/ToastErrorPage/ErrorMessage";
import { tokens } from "../../../../Admin/theme";
import { UserContext } from "../../../../Admin/Pages/global/LoginContext";
import { useContext } from "react";
const ModalNotification = ({ todoIssues }) => {
  const { user } = useContext(UserContext);
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div
      className="modal fade"
      id="notification"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h3 className="modal-title">The following statuses are yet to be completed (todo) </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div>
            {todoIssues.length>0? (
      <table style={{ borderCollapse: 'collapse', width: '100%',color:colors.primary[600] }}>
        <thead>
          <tr>
            <th  style={{ border: '1px solid black', padding: '8px'}}>Issue Created on</th>
            <th style={{ border: '1px solid black', padding: '8px'}}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px'}}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px'}}>Phone Number</th>
{user.role==="admin" && <th style={{ border: '1px solid black', padding: '8px'}}>Service Type</th>}
            <th style={{ border: '1px solid black', padding: '8px'}}>Issue Status</th>
          </tr>
        </thead>
        <tbody>
          {todoIssues.map(issue => (
            <tr key={issue._id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(issue.createdAt)}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{issue.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{issue.email}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{issue.phoneNumber}</td>
 {user.role==="admin" && <td style={{ border: '1px solid black', padding: '8px' }}>{issue.serviceType}</td>}
              <td style={{ border: '1px solid black', padding: '8px' }}>{issue.issueStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
          ):<h1 style={{color:"red",textAlign:"center"}}>No status is on todo</h1>}
    </div>
          <div className="modal-footer">
            <button
             className="btn btn-warning"
              disableElevation
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <ErrorMessage />
    </div>
  );
};

export default ModalNotification;
