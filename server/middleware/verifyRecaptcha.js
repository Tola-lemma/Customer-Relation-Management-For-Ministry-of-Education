import { BadRequestError, UnauthorizedError } from "../error/errors.js"

export const verifyRecaptcha = async(req, res, next) => {
    const {token} = req.body
    if(!token) throw new BadRequestError("token is required")
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        {
          method: "POST",
        }
      );
      const { success } = await response.json();
        // console.log(success, response);
        if(!success) throw new UnauthorizedError("reCAPTCHA verification failed")
        next();

    } catch (error) {
        throw new UnauthorizedError("reCAPTCHA verification failed")
    }
}