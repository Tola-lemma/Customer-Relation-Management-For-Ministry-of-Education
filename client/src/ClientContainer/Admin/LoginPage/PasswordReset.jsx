import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Pages/global/Button";
export const PasswordReset = () => {
  const { showError } = useContext(ErrorContext);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const handleReset = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = passwords;
    if(password !== confirmPassword){
      showError(`passwords don't match`)
      return
    }
    try {
      setUpdating(true);
      await axios.post(`auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (error) {
    showError("Please Fill Correctly!"+ error?.response?.data?.msg);
  }
    finally {
    setUpdating(false);
  }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  };
  return (
    <>
    <button className="btn btn-primary rounded-pill ms-2 mt-3" onClick={()=>navigate('/')}>🏠 Back to Home</button>
    <div className="loginpage">
      <div className="login-box">
        <div className="login-parent">
          <h2>Password Reset</h2>
          <form>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                required
                value={passwords.password}
                name="password"
                onChange={handleInputChange}
              />
              <label htmlFor="password">New Password</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                required
                value={passwords.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
              />
              <label htmlFor="password">Confirm New Password</label>
            </div>
            <CustomButton
            type="submit"
            className="loginbtn btn btn-primary mt-5"
            onClick={handleReset}
            disabled={updating} loading={updating}
            >Reset</CustomButton>
          </form>
          <ErrorMessage />
        </div>
      </div>
    </div>
    </>
  );
};
