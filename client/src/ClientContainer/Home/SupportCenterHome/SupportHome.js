import React from "react";
import "./SupportHome.css";
import { NavBar } from "./../.././HeaderAndFooter/header/NavBar";
import { Link } from "react-router-dom";
import './SupportHome.css'
export const SupportHome = () => {
  return (
    <div>
      <NavBar />
      <div className="container SupportHomeContainer">
        <div className="landing-page">
            <div className="main-content">
               <div className="search-box">
                 <input type="text" className="form-control   " placeholder="search our knowledgebase"/>
                 <button className="btn btn-primary rounded-pill"> Search </button>
               </div>
              <div className="welcome_message">
                   <h1>Welcome to the MoE Support Center</h1>
               </div>
            </div>
                <div className="sidebar-container">
                    <div className="front-button">
                        <p><Link to="/opennewticket"  className="btn btn-primary rounded-pill open">Open a New Ticket</Link></p>
                        <p><Link to="/checkticketstatus" className="btn btn-warning rounded-pill check">Check Ticket Status</Link></p>
                    </div>
               <div className="featured-questions">
                   <section>
                     <div className="first-text">
                       Featured Questions 
                     </div>
                   </section>
              </div>
            </div>
        </div>
    </div>
    </div>
  );
};
