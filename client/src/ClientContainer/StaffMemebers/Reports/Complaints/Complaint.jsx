import { useEffect, useState } from 'react';
import axios from 'axios';
import ComplaintReport from '../../../Admin/Pages/Reports/complaintReport/ComplaintReport';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';

const Complaint = (props) => {
  const [reportData, setReportData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`/issue/report?startDate=${startDate}&endDate=${endDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { aggregateReport } = response.data;
        const transferReports = aggregateReport.filter(report => report.serviceType === "complaintRequest");
        setReportData(transferReports);
      } catch (error) {
        alert(error?.response?.data?.msg);
      }
    };

    fetchReportData();
  }, [startDate, endDate]);

  return (
    <div>
      <div className={`modal ${props.openComplaintModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: props.complaintModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title ms-5">{props.title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={props.closeComplaintModal}></button>
            </div>
            <div className="modal-body">
            <div>
      <table style={{ color: colors.primary[600] }}>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}  />
            </td>
            <td>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
            {reportData.length === 0 ? (
                <p style={{color:"red",fontSize:"3rem"}}>Currently No Data</p>
              ) : (
              reportData.map((report, index) => (
                <ComplaintReport
                  key={index}
                  // title={report.serviceType}
                  title= "Complaint Request"
                  issueType={report.serviceType}
                  details={report.mostCommonIssueDescriptions.join("\n")}
                  fromDate={formatDate(report.fromDate)}
                  toDate={new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                  issuesReceived={report.count}
                  issuesHandled={report.count - report.issueStatus[0].count}
                  issuesProcessing={report.issueStatus[0].count}
                />
              )))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger rounded-pill" onClick={props.closeComplaintModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
