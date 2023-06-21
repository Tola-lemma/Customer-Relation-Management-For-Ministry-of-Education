import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const EmailSubmission = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { showError,showSuccess } = useContext(ErrorContext);

  const handleSend = async () => {
    try {
     await axios.post("/auth/forget-password", { email });
      showSuccess('Please check your email address!');
      navigate("/");
    } catch (error) {
      showError(`error occured`)
      console.log(error);
  
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
   // console.log(email);
  };

  return (
    <div className="loginpage">
      <div className="login-box">
        <div className="login-parent">
          <h2>Please provide an email address</h2>
          <form>
            <div className="input-box" style={{ marginTop: "5rem" }}>
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="email"> Enter Your Email Account</label>
            </div>
            <button
              type="submit"
              className="loginbtn btn btn-primary"
              onClick={handleSend}
              style={{ marginTop: "4rem" }}
            >
              Send
            </button>
          </form>
          <ErrorMessage />
        </div>
      </div>
    </div>
  );
};