import { StatusCodes } from "http-status-codes";

export const routeNotFoundMiddleware = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({success : false, msg : "route does not exist."});
