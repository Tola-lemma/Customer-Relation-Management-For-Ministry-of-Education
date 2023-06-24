export const requestServiceUtil = [
  {
    requestType: "transferRequest",
    title: "Teacher transfer request",
    description: {
      approvalLetter:
        "A letter of approval for the institution where he/she is working",
      receivingInstitutionLetter:
        "A letter stating that the receiving institution is willing to accept",
      debtAndServiceTimeLetter:
        "A letter stating how much debt and service time he owes to the applicant institution and showing that he is willing to pay to the recipient",
      medicalBoardEvidences:
        "Evidence of medical board from government health institutions confirming that he cannot work in the environment",
    },
  },
  {
    requestType: "transferRequest",
    title: "Student transfer request",
    description: {
      medicalBoardEvidence:
        "Providing medical board evidence from government health institutions that proves that he cannot study in the environment",
      receivingInstitutionLetter:
        "A letter showing that the receiving institution is authorized",
      studentInformationConfirmation:
        "Confirm that the student's information is free from any academic and administrative errors for the institution and send it to the receiving institution",
    },
  },
  {
    requestType: "studyAbroadRequest",
    title: "A request to return to work after completing their studies abroad",
    description: {
      LetterofCompletion: "A letter from the country/embassy showing that they have completed their studies",
      DegreeVerification: "The degree is verified by the relevant body/Authentication and equivalent assessment from the education and training authority",
      ReturningtoWorkInstitution: "Returning to work institution/university",
    },
  },
  {
    requestType: "scholarshipRequest",
    title: "Scholarship Request",
    description: {
      ProofOfFullScholarship: "Proof that the scholarship is a full scholarship",
      LetterOfAdmission: "Letter of admission",
       letterOfsupport :"Letter of support from the institution where he/she works"
    },
  },
   {requestType : "complaintRequest",
    title: "Various academic and administrative complaints",
    subTitle : "Regarding unresolved problems and complaints regarding good governance",
    description: {
      IssuePresentation: "The issue was presented to the management/complaint hearing committee at all levels and the senior management of the institution",
      BoardDecision: "A decision presented to the management of the institution's board",
      IssueExplanation: "A document explaining the issue that the person claims",
      ManagementDeficiencies: "Documentary evidence to provide suggestions for good management deficiencies in any service provision",
      InstitutionSupport: "Letter of support from the institution where he/she works",
    },
  },
];
