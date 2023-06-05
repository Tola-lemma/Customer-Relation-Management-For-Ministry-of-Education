import jwt from "jsonwebtoken";
import { UnauthenticatedError, UnauthorizedError } from "../error/errors.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization: auth } = req.headers;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = { Id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    //token expired error
  if (error.name === "TokenExpiredError") {
    throw new UnauthenticatedError("token session time out");
  }
  if (error.name === "JsonWebTokenError") {
    throw new UnauthenticatedError("Invalid token");
  }
  else{
    throw new UnauthenticatedError("Invalid Credentials");
  }
  }
};

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Access Denied.");
    }
    next();
  };
};
