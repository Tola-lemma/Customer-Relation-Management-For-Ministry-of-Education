import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
<<<<<<< HEAD

=======
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import axios from "axios";
>>>>>>> bfdc19f49b77c13ee682b484b39d8bdb0438cff3
export const LoginPage = () => {
  const { showError,showSuccess } = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, msg } = response.data;
      showSuccess("Successfully "+ msg + "!");
      localStorage.setItem("token", token);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/admin")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        showError(error.response.data.error);
      }  
      else if (error.message) {
        showError(error.message);
      } else {
        showError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="loginpage">
      <div className="login-box">
        <div className="login-parent">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input type="email" required 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}/>
              <label htmlFor="email"> Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" required 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
              <label htmlFor="password"> Password</label>
            </div>
            <div className="forgotPassword">
              <Link to="/emailsubmission" className="forgotpasswordLink">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="loginbtn btn btn-primary"
            >
              Login
            </button>
          </form>
          <ErrorMessage />
        </div>
      </div>
    </div>
  );
};
