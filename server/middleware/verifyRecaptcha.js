import { UnauthenticatedError } from "../error/errors.js"

export const verifyRecaptcha = async(req, res, next) => {
    const {token} = req.body
    try {
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
        const response = await fetch(verificationURL, {method : 'POST'})
        const success = await response.json();
        if(!success) throw new UnauthenticatedError("reCAPTCHA verification failed")
        next();

    } catch (error) {
        throw new UnauthenticatedError("reCAPTCHA verification failed")
    }
}