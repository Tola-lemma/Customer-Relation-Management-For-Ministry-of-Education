import { useEffect, useState } from 'react';
import ReportTemplate from './ReportTemplate';
import axios from 'axios';
// import { ErrorContext } from '../../ToastErrorPage/ErrorContext';
const Reports = (props) => {
  const [reportData, setReportData] = useState([]);
  // const { showError } = useContext(ErrorContext);
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get("/admin/report", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { aggregateReport } = response.data;
        setReportData(aggregateReport);
      } catch (error) {
        alert(error?.response?.data?.msg)
      }
    };

    fetchReportData();
  }, []);
  return (
    <div>
      <div className={`modal ${props.modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display:props.modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title ms-5">{props.title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={props.closeModal}></button>
            </div>
            <div className="modal-body">
            {reportData.map((report, index) => (
                <ReportTemplate
                  key={index}
                  title={report.serviceType}
                  issueType={report.serviceType}
                  details={report.mostCommonIssueDescriptions.join("\n")}
                  fromDate={props.fromDate}
                  toDate={props.toDate}
                  issuesReceived={report.count}
                  issuesHandled={report.count - report.issueStatus[0].count}
                  issuesProcessing={report.issueStatus[0].count}
                />
              ))}
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
