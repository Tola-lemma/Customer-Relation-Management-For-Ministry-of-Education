import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "registerd" });
};

export const login = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "login" });
};
