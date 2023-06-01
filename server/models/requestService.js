import mongoose from "mongoose";

const RequestServiceSchema = mongoose.Schema({
  requestType: {
    type: String,
    enum: [
      "TransferRequest",
      "StudyAbroadRequest",
      "ScholarshipRequest",
      "ComplaintsRequest",
    ],
    required: [true, "request type is required"],
  },
  title: {
    type: String,
    required: [true, "service Title is required"],
  },

  description: {
    type : Object,
    required : true
  },
});

export const RequestService = mongoose.model("RequestService", RequestServiceSchema);