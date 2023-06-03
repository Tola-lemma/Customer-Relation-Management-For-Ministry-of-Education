import ReportTemplate from './ReportTemplate';

const Reports = (props) => {
  const title = "Transfer Request";
  const issueType = "Student and Teacher Transfer Request";
  const fromDate = "May 1, 2023";
  const toDate = "May 15, 2023";
  const issuesReceived = 10;
  const issuesHandled = 7;
  const issuesProcessing = issuesReceived - issuesHandled;
  const details = `The report highlights the following key details:
  - Title: ${title}
  - Issue Type: ${issueType}
  - Issues Received: ${issuesReceived}
  - Issues Handled: ${issuesHandled}
  - Issues Processing: ${issuesProcessing}
  
  Furthermore, the report incorporates detailed descriptions of each issue, allowing for a comprehensive understanding of their nature and context. Attachments related to the issues, if any, are also included for reference.
  
  The report adheres to a professional format, utilizing clear and concise language, and presents the information in an organized manner. It serves as a valuable resource for stakeholders involved in the project, providing insights into the specific issues encountered, their current status, and the overall progress in resolving them.
  
  By downloading this report, stakeholders gain a comprehensive understanding of the project's status, enabling informed decision-making and effective management of the identified issues.
  
  Note: The report is provided in PDF format, ensuring its accessibility and compatibility across various platforms and devices.`;

  return (
    <div>
      <div className={`modal ${props.modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display:props.modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title ms-5">{title} Report</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={props.closeModal}></button>
            </div>
            <div className="modal-body">
              <ReportTemplate
                title={title}
                issueType={issueType}
                details={details}
                fromDate={fromDate}
                toDate={toDate}
                issuesReceived={issuesReceived}
                issuesHandled={issuesHandled}
                issuesProcessing={issuesProcessing}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger rounded-pill" onClick={props.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
