import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import axios from "axios";
import { UserContext } from "../Pages/global/LoginContext";
import CustomButton from "../Pages/global/Button";
export const LoginPage = () => {
  const { showError } = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const roleRoutes = useMemo(
    () => ({
      admin: "/admin",
      transferCoordinator: "/staff",
      studyAbroadCoordinator: "/staff",
      scholarshipCoordinator: "/staff",
      complaintsCoordinator: "/staff",
    }),
    []
  );
  useEffect(() => {
    const tokenInLs = localStorage.getItem("token");
    if (tokenInLs && user.username && user.role) {
      setIsAuthenticated(true);
      navigate(roleRoutes[user.role]);
    } else {
      axios
        .get("/auth/check-auth", {
          headers: {
            authorization: `Bearer ${tokenInLs}`,
          },
        })
        .then(() => {
          setIsAuthenticated(true);
          navigate(roleRoutes[user.role]);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, [navigate, roleRoutes, user.role, user.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const response = await axios.post("/auth/login", { email, password });
      const { token,username, role} = response.data;
      localStorage.setItem("token", token);
      login(username, role);
    if (role in roleRoutes) {
      navigate(roleRoutes[role]);
      setIsAuthenticated(true);
    }
    } catch (error) {
        showError(error?.response?.data?.msg||"An error occurred. Please try again.");
      }  
      finally {
        setUpdating(false);
      }
    };
  return isAuthenticated ? null: (
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
            <Link to="/forget-password" className="forgotpasswordLink">
              Forgot Password?
            </Link>
          </div>
          <CustomButton  
          type="submit"
          className="loginbtn btn btn-primary"
          disabled={updating} loading={updating}> Login</CustomButton>
        </form>
        <ErrorMessage />
      </div>
    </div>
  </div>
  </>);
  
  
  
  
};
