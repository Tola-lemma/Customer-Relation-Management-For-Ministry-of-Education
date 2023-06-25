import { Footer } from '../../HeaderAndFooter/Footer/Footer';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import React, { useState, useContext, useRef } from "react";
import { NavBar } from "../../HeaderAndFooter/header/NavBar";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { ErrorContext } from "../../Admin/ToastErrorPage/ErrorContext";
import { ErrorMessage } from "../../Admin/ToastErrorPage/ErrorMessage";
import CustomButton from "../../Admin/Pages/global/Button";

export const ContactUs = () => {
  const { showError, showSuccess } = useContext(ErrorContext);
  const recaptchaRef = useRef(null);
  const [updating, setUpdating] = useState(false);
 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    country: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await recaptchaRef.current.getValue();
    console.log(token);
    try {
      setUpdating(true);
      const response = await axios.post("/contact-us", {...formData,token: token});
      const { msg } = response.data
      showSuccess("Thank you! " + msg);
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        country: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      showError(error?.response?.data?.msg || "An error occurred, please try again later.");
    } finally {
      setUpdating(false);
    }
  };

  const {
    firstName,
    lastName,
    companyName,
    email,
    country,
    phoneNumber,
    subject,
    message,
  } = formData;

  // Update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <NavBar />
      <h1
        style={{
          color: "#0072bc",
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        Contact Us
      </h1>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Box sx={{ boxShadow: 3, p: 4, width: "70%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mt-2">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                />
              </div>
              <div className="col-md-6 mt-2">
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Company Name (optional)"
                  name="companyName"
                  value={companyName}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  label="Email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Country (optional)"
                  name="country"
                  value={country}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  label="Phone Number (optional)"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                />
              </div>
            </div>
            <TextField
              label="Subject"
              name="subject"
              value={subject}
              onChange={handleInputChange}
              required
              fullWidth
              style={{ marginBottom: "2rem" }}
            />
            <TextField
              label="Your Message"
              name="message"
              multiline
              rows={5}
              value={message}
              onChange={handleInputChange}
              required
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            <ReCAPTCHA
              style={{ width: "16%", marginLeft: "40%",marginBottom:"3px" }}
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            />
            <CustomButton
              type="submit"
              className="btn btn-primary rounded-pill"
              style={{ width: "16%", marginLeft: "40%" }}
              disabled={updating}
              loading={updating}
            >
              {" "}
              Submit
            </CustomButton>
          </form>
          <ErrorMessage />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};
