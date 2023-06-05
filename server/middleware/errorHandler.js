import { StatusCodes } from "http-status-codes";
import {MulterError} from "multer"

export const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    message: err.message || "something went wrong. please try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  //mongo errors
  //duplicate error for email
  if (err.code == 11000) {
    customError.message = `duplicate values for ${Object.keys(
      err.keyValue
    )}, please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //casting error
  if (err.name === "CastError") {
    customError.message = `No item with id : ${err.value} found.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //validation error
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //uploading error
  if(err instanceof MulterError && err.code == "LIMIT_FILE_SIZE"){
    
    customError.message = "File Size is too large. Allowed file size is 5MB"
    customError.statusCode = 413
  }

  if(err instanceof MulterError && err.code === 'LIMIT_UNEXPECTED_FILE'){
    
    customError.message = "an error occured when uploading"
    customError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY
  }
  
  return res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.message });
};
