import { useEffect, useState } from 'react';
import axios from 'axios';
import TransferReport from './TransferReport';

const Transfer = (props) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get("/admin/report", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { aggregateReport } = response.data;
        const transferReports = aggregateReport.filter(report => report.serviceType === "transferRequest");
        setReportData(transferReports);
      } catch (error) {
        alert(error?.response?.data?.msg);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <div className={`modal ${props.openTransferModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: props.transferModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title ms-5">{props.title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={props.closeTransferModal}></button>
            </div>
            <div className="modal-body">
            {reportData.length === 0 ? (
                <p style={{color:"red",fontSize:"3rem"}}>Currently No Data</p>
              ) : (
              reportData.map((report, index) => (
                <TransferReport
                  key={index}
                  // title={report.serviceType}
                  title= "Transfer Request"
                  issueType={report.serviceType}
                  details={report.mostCommonIssueDescriptions.join("\n")}
                  fromDate={props.fromDate}
                  toDate={props.toDate}
                  issuesReceived={report.count}
                  issuesHandled={report.count - report.issueStatus[0].count}
                  issuesProcessing={report.issueStatus[0].count}
                />
              )))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger rounded-pill" onClick={props.closeTransferModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
