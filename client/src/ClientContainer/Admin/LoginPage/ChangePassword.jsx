import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Pages/global/Button";
import { UserContext } from "../Pages/global/LoginContext";
export const ChangePassword = () => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const { showError, showSuccess } = useContext(ErrorContext);
  const {user} = useContext(UserContext);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleReset = () => {
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };
  const { oldPassword, newPassword, confirmNewPassword } = passwords;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const endpoint = user.role === "admin" ? "/admin/change-password" : "/auth/change-password";
      const {
        data: { msg, token },
      } = await axios.put(
       endpoint,
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showSuccess(msg);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/staff");
      }
      localStorage.setItem("token", token);
    } catch (error) {
      showError(
        error?.response?.data?.msg || "Error ocuured in Changing the password"
      );
    } finally {
      setUpdating(false);
      handleReset();
    }
  };
  return (
    <>
      {user.role === "admin" ? (
  <button
    className="btn btn-primary rounded-pill ms-2 mt-3"
    onClick={() => navigate("/admin")}
  >
    🏠 Back to admin page
  </button>
) : (
  <button
    className="btn btn-primary rounded-pill ms-2 mt-3"
    onClick={() => navigate("/staff")}
  >
    🏠 Back to your page
  </button>
)}
      <div className="loginpage">
        <div className="login-box">
          <div className="login-parent">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <span className="icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">Old Password</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
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
                  name="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">Confirm New Password</label>
              </div>
              <CustomButton
                type="submit"
                className="loginbtn btn btn-primary"
                disabled={updating}
                loading={updating}
              >
                Change
              </CustomButton>
            </form>
            <ErrorMessage />
          </div>
        </div>
      </div>
    </>
  );
};
