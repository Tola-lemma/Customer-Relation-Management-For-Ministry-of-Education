import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

//initail state look like this : state = {  username: "",password: "",failedSubmitMsg: "",}

const handleSubmit = async(event) => {
  event.preventDefault();
  const {email, password} = this.state
  try {
    const url = "http://localhost:3000/api/v1/auth/login";
    const res = await axios.post(url, {email, password});
    localStorage.setItem("authStatus", JSON.stringify({signedIn : true, token : res.data.token}))
    //set your state here like :- signedIn : true, token : res.data.token
    //and reset your previous email and password state to null like this:- username: "", password: ""
  } catch (error) {
    //set failedMsg state : failedMsg : error.response?.data?.msg || "An error occured while sending your message, please try again"
    
  }
}

export const LoginPage = () => {
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
            <button type="submit" className="loginbtn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
