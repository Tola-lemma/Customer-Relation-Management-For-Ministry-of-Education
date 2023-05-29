import React from "react";
import "./SupportHome.css";
import { NavBar } from "./../.././HeaderAndFooter/header/NavBar";
import { HashLink as Link } from 'react-router-hash-link';
import "./SupportHome.css";
import { SearchTopic } from "../../SearchComponent/SearchTopic";
import Topics from "../../.././Data.json";
import { Footer } from "../../HeaderAndFooter/footer/Footer";
export const SupportHome = () => {
  return (
   <>
    <div>
      <NavBar />
      <div className="container SupportHomeContainer">
        <div className="landing-page">
          <div className="main-content">
            <div className="search-box">
              <SearchTopic
                placeholder={`Search our knowledgebase`}
                data={Topics}
              />
            </div>
            <div className="welcome_message">
              <h1>Welcome to the MoE Support Center</h1>
              <p>
                In order to streamline support requests and better serve you, we
                utilize a support ticket system. For your reference, we provide
                complete archives and a history of all your support requests.
                <br />A valid email address is required to submit a ticket.
              </p>
            </div>
          </div>
          <div className="sidebar-container">
            <div className="front-button">
              <p>
                <Link
                  to="/opennewticket"
                  className="btn btn-primary rounded-pill open"
                >
                  Open a New Ticket
                </Link>
              </p>
              <p>
                <Link
                  to="/checkticketstatus"
                  className="btn btn-warning rounded-pill check"
                >
                  Check Ticket Status
                </Link>
              </p>
            </div>
            <div className="featured-questions">
              <section>
                <div className="first-text">Featured Questions</div>
                <div>
                  <Link to="knowledgebase#transfer" className="questions">
                    Student transfer request
                  </Link>
                </div>
                <div>
                  <Link to="knowledgebase#transfer" className="questions">
                    Teacher transfer request
                  </Link>
                </div>
                <div>
                  <Link to="knowledgebase#returntowork" className="questions">
                    Request to return to work after studying abroad
                  </Link>
                </div>
                <div>
                  <Link to="knowledgebase#scholarship" className="questions">
                    Scholarship question
                  </Link>
                </div>
                <div>
                  <Link to="knowledgebase#complaints" className="questions">
                    Various academic and administrative complaints
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Footer/>
   </>
  );
};
