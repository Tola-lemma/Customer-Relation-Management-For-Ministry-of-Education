import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CustomButton from "../Pages/global/Button";

export const EmailSubmission = () => {
  const [email, setEmail] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const { showError,showSuccess } = useContext(ErrorContext);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
     const {data:{msg}} = await axios.post("/auth/forget-password", { email });
      showSuccess(`${msg}, please check your email`);
    } catch (error) {
      showError("An error occurred, " + error?.response?.data?.msg)
    }
    finally {
      setUpdating(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
   // console.log(email);
  };

  return (
    <><button className="btn btn-primary rounded-pill ms-2 mt-3" onClick={()=>navigate('/')}>🏠 Back to Home</button>
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
            <CustomButton 
            type="submit" 
            className="loginbtn btn btn-primary" 
            onClick={handleSend}
            style={{ marginTop: "4rem" }}
            disabled={updating} loading={updating}>
              Send
            </CustomButton>
          </form>
          <ErrorMessage />
        </div>
      </div>
    </div>
    </>
  );
};