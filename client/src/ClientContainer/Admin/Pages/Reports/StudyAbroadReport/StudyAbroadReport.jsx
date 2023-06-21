import React from 'react';
import jsPDF from 'jspdf';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const StudyAbroadReport = ({
  title,
  issueType,
  details,
  fromDate,
  toDate,
  issuesReceived,
  issuesHandled,
  issuesProcessing,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const downloadReport = () => {
    const doc = createReportDocument(
      title,
      issueType,
      details,
      fromDate,
      toDate,
      issuesReceived,
      issuesHandled,
      issuesProcessing
    );

    doc.save(`${title} Report.pdf`);
  };

  const createReportDocument = (
    title,
    issueType,
    details,
    fromDate,
    toDate,
    issuesReceived,
    issuesHandled,
    issuesProcessing
  ) => {
    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFont('times', 'roman');
    doc.setFontSize(18);
    doc.text(title, 20, 20);

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.text(`Issue Type: ${issueType}`, 20, 30);

    doc.setFont('times', 'normal');
    doc.text(`Date Range: ${fromDate} to ${toDate}`, 20, 40);
    doc.text(`Issues Received: ${issuesReceived}`, 20, 50);
    doc.text(`Issues Handled: ${issuesHandled}`, 20, 60);
    doc.text(`Issues Processing: ${issuesProcessing}`, 20, 70);

    doc.setFont('times', 'bold');
    doc.text('Details:', 20, 90);
    doc.setFont('times', 'normal');
    if (details) {
      const splitDetails = doc.splitTextToSize(details, 170);
      doc.text(splitDetails, 20, 100);
    } else {
      doc.text('No details available', 20, 100);
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 20, 280);
    }

    return doc;
  };

  return (
    <div className='bg-reports' style={{ color: colors.primary[600] }}>
      <h2>{title}</h2>
      <p>
        <strong>Issue Type:</strong> Request to return to work after studying abroad
      </p>
      <p>
        <strong>Date Range:</strong> {fromDate} to {toDate}
      </p>
      <p>
        <strong>Issues Received:</strong> {issuesReceived}
      </p>
      <p>
        <strong>Issues Handled:</strong> {issuesHandled}
      </p>
      <p>
        <strong>Issues Processing:</strong> {issuesProcessing}
      </p>
      <div>
        <p>
          <strong>Details:</strong>
        </p>
        {details &&
          details.split('\n').map((item, index) => (
            <p key={index} style={{ fontSize: '0.95rem' }}>
              {item}
            </p>
          ))}
      </div>
      <hr className='shadow-lg' />
      <div style={{ textAlign: 'center' }}>
        <button onClick={downloadReport} className='btn btn-primary rounded-pill'>
          Download Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default StudyAbroadReport;
