import { useEffect, useState } from 'react';
import axios from 'axios';
import StudyAbroadReport from '../../../Admin/Pages/Reports/StudyAbroadReport/StudyAbroadReport';

const StudyAbroad = (props) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get("/issue/report", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { aggregateReport } = response.data;
        const transferReports = aggregateReport.filter(report => report.serviceType === "studyAbroadRequest");
        setReportData(transferReports);
      } catch (error) {
        alert(error?.response?.data?.msg);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <div className={`modal ${props.openStudyAbroadModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: props.studyAbroadModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title ms-5">{props.title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={props.closeStudyAbroadModal}></button>
            </div>
            <div className="modal-body">
            {reportData.length === 0 ? (
                <p style={{color:"red",fontSize:"3rem"}}>Currently No Data</p>
              ) : (
              reportData.map((report, index) => (
                <StudyAbroadReport
                  key={index}
                  // title={report.serviceType}
                  title= "Request to return to work after studying abroad"
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
              <button type="button" className="btn btn-danger rounded-pill" onClick={props.closeStudyAbroadModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroad;
