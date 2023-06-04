import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import axios from "axios";
export const LoginPage = () => {
  const { showError } = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const tokenInLs = localStorage.getItem("token");
    axios.get("/auth/check-auth", {headers : {
      authorization : `Bearer ${tokenInLs}`
    }}).then(() => {
      setIsAuthenticated(true);
    }).catch(() => {
      setIsAuthenticated(false)
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token} = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
        showError(error.response?.data?.msg||"An error occurred. Please try again.");
      }  
    };
  return isAuthenticated ? navigate("/admin") : (
  <> 
  <button className="btn btn-primary rounded-pill ms-2 mt-3" onClick={()=>navigate('/')}>🏠 Back to Home</button>
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
  </>);
  
  
  
  
};
