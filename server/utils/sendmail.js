import nodemailer from "nodemailer";

export const sendMail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE == "true",
      auth: {
        user: process.env.SMTP_FROM,
        pass: process.env.SMTP_PASS,
      },
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (!err) {
        // console.log("success", info.response);
        resolve(true);
        return
      }
      resolve(false);
      // console.log("failed", err);
    });
  });
};

