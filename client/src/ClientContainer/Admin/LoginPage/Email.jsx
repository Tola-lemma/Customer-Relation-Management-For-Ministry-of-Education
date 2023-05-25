import React , { useContext } from "react";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
export const EmailSubmission = () => {
  const { showSuccess } = useContext(ErrorContext);
  const handleSend = () => {
            showSuccess('Please Fill Correctly!');
  };
  return (
    <div className="loginpage">
      <div className="login-box">
        <div className="login-parent">
          <h2>Please provide an email address</h2>
          <form>
            <div className="input-box" style={{marginTop:"5rem"}}>
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input type="email" required />
              <label htmlFor="email"> Enter Your Email Acccount</label>
            </div>
            <button type="submit" className="loginbtn btn btn-primary" onClick={handleSend}
            style={{marginTop:"4rem"}}>
              Send
            </button>
          </form>
      <ErrorMessage/>
        </div>
      </div>
    </div>
  );
};
