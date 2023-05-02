import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    message: err.message || "something went wrong. please try again later",
    statusCode: err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  //mongo errors
  //duplicate error for username
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

  return res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.message });
};
