import mongoose from "mongoose";

const requestIssueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
      minLength: 5,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "invalid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required."],
      minLength: 10,
    },
    serviceType: {
      type: String,
      required: [true, "service type is required."],
      enum: [
        "transferRequest",
        "studyAbroadRequest",
        "scholarshipRequest",
        "complaintRequest",
      ],
    },
    issueDescription: {
      type: String,
      required: [true, "issue description or summary is required"],
      trim : true,
      minLength: 10,
    },
    issueStatus: {
      type: String,
      required: true,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },
    ticketNumber : {
      type : String,
      default : null
    }
  },
  { timestamps  : true}
);

export const RequestIssue = mongoose.model("RequestIssue", requestIssueSchema);
