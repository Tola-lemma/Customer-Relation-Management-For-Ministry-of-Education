import mongoose from "mongoose";
import {ServiceTypes} from "./serviceTypes.js"

const RequestServiceSchema = mongoose.Schema({
  requestType: {
    type: String,
    enum: [
      ServiceTypes.transferCoordinator,
      ServiceTypes.studyAbroadCoordinator,
      ServiceTypes.scholarshipCoordinator,
      ServiceTypes.complaintsCoordinator,
    ],
    // required: [true, "request type is required"],
  },
  title: {
    type: String,
    // required: [true, "service Title is required"],
  },
  subTitle : {
    type :  String
  },
  description: {
    type : Object,
    required : true
  },
});

export const RequestService = mongoose.model("RequestService", RequestServiceSchema);