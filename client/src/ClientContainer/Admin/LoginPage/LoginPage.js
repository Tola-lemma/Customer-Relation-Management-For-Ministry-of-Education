import React , { useContext } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
export const LoginPage = () => {
  const { showError } = useContext(ErrorContext);
  const handleSubmit = () => {
    showError('Please Fill Correctly!');
  };
  return (
    <div className="loginpage">
      <div className="login-box">
        <div className="login-parent">
          <h2>Login</h2>
          <form>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input type="email" required />
              <label htmlFor="email"> Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" required />
              <label htmlFor="password"> Password</label>
            </div>
            <div className="forgotPassword">
              <Link to="#" className="forgotpasswordLink">Forgot Password?</Link>
            </div>
            <button type="submit" className="loginbtn btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </form>
      <ErrorMessage/>
        </div>
      </div>
    </div>
  );
};
