import React , { useContext } from "react";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
export const PasswordReset = () => {
  const { showError } = useContext(ErrorContext);
  const handleReset = () => {
    showError('Please Fill Correctly!');
  };
  return (
    <div className="loginpage">
      <div className="login-box">
        <div className="login-parent">
          <h2>Password Reset</h2>
          <form>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" required />
              <label htmlFor="password">New Password</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type="password" required />
              <label htmlFor="password">Confirm New Password</label>
            </div>
            <button type="submit" className="loginbtn btn btn-primary mt-5" onClick={handleReset}>
              Reset
            </button>
          </form>
      <ErrorMessage/>
        </div>
      </div>
    </div>
  );
};
