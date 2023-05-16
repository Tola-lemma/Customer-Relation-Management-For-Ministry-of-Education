export const requestServiceUtil = [
  {
    requestType: "TransferRequest",
    title: "Teacher transfer request",
    description: {
      approvalLetter:
        "A letter of approval for the institution where he/she is working",
      receivingInstitutionLetter:
        "A letter stating that the receiving institution is willing to accept",
      debtAndServiceTimeLetter:
        "A letter stating how much debt and service time he owes to the applicant institution and showing that he is willing to pay to the recipient",
      medicalBoardEvidence:
        "Evidence of medical board from government health institutions confirming that he cannot work in the environment",
    },
  },
  {
    requestType: "TransferRequest",
    title: "Student transfer request",
    description: {
      medicalBoardEvidence:
        "Providing medical board evidence from government health institutions that proves that he cannot study in the environment",
      receivingInstitutionLetter:
        "A letter showing that the receiving institution is authorized",
      studentInformationConfirmation:
        "Confirm that the student's information is free from any academic and administrative errors for the Q institution and send it to the receiving institution",
    },
  },
  {
    type: "studyAbroadRequest",
    title: "A request to return to work after completing their studies abroad",
    description: [
      "Letter of Completion: A letter from the country/embassy showing that they have completed their studies",
      "Degree Verification: The degree is verified by the relevant body/Authentication and equivalent assessment from the education and training authority",
      "Returning to Work Institution: Returning to work institution/university",
    ],
  },
  {
    type: "scholarshipRequest",
    title: "Scholarship Request",
    description: [
      "Proof of Full Scholarship: Proof that the scholarship is a full scholarship",
      "Letter of Admission: Letter of admission",
    ],
  },
   {type : "complaintsRequest",
    title: "Complaints Request",
    description: [
      "Issue Presentation: The issue was presented to the management/complaint hearing committee at all levels and the senior management of the institution",
      "Board Decision: A decision presented to the management of the institution's board",
      "Issue Explanation: A document explaining the issue that the person claims",
      "Management Deficiencies: Documentary evidence to provide suggestions for good management deficiencies in any service provision",
      "Institution Support: Letter of support from the institution where he/she works",
    ],
  },
];
