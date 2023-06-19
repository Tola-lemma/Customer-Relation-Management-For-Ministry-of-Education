import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../error/errors.js";
import { contactUsMailOptions } from "../utils/mailOptions.js";
import { sendMail } from "../utils/sendmail.js";

export const contactUs = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    email,
    country,
    phoneNumber,
    subject,
    message,
  } = req.body;
  if (!firstName || !lastName || !email || !subject || !message)
    throw new BadRequestError("please provide required fields");

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) throw new BadRequestError("Invalid email");

  await sendMail(
    contactUsMailOptions(
      firstName,
      lastName,
      email,
      subject,
      message,
      phoneNumber,
      companyName,
      country
    )
  );
  res.status(StatusCodes.OK).json({ success: true, msg: "message recieved." });
};
