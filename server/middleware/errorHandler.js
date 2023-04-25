import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    message: err.message || "something went wrong. please try again lator",
    statusCode: err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.message });
};
