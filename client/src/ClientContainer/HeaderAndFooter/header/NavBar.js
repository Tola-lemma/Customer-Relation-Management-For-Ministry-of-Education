import { Link } from "react-router-dom";
import logo from "../../.././assets/images/MoELogo.png";
import "./header.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Client } from "../../Admin/Pages/global/Client";
export const NavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  return (
    <div className="navBackground shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg font-weight-bold ">
          <div className="container-fluid ml-3 ">
            <Link to="/">
              <img
                src={logo}
                alt="Avatar Logo"
                style={{ width: "5.7rem" }}
                className="rounded-pill"
              />
            </Link>
            <span className="Logo_Side_text">
              <span> Customer Relation Management</span>
              <br />
              <span> For</span>
              <br />
              <span> Ministry Of Education</span>
            </span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                <li
                  className={`nav-item ml-3 ${
                    activeLink === "/" ? "active" : ""
                  }`}
                  onClick={() => setActiveLink("/")}
                >
                  <Link className="nav-link ml-3 " aria-current="page" to="/">
                  🏠 Support Center Home
                  </Link>
                </li>
                <li
                  className={`nav-item ml-3 ${
                    activeLink === "/knowledgebase" ? "active" : ""
                  }`}
                  onClick={() => setActiveLink("/knowledgebase")}
                >
                  <Link className="nav-link ml-3 " to="/knowledgebase">
                    <i className="fa-solid fa-book " style={{color:"#00a4ef"}}></i> Knowledgebase
                  </Link>
                </li>
                <li
                  className={`nav-item ml-3 ${
                    activeLink === "/opennewticket" ? "active" : ""
                  }`}
                  onClick={() => setActiveLink("/opennewticket")}
                >
                  <Link className="nav-link" to="/opennewticket">
                    <i className="fa-sharp fa-solid fa-file-circle-plus"></i> Open
                    New Ticket
                  </Link>
                </li>
                <li
                  className={`nav-item ml-3 ${
                    activeLink === "/checkticketstatus" ? "active" : ""
                  }`}
                  onClick={() => setActiveLink("/checkticketstatus")}
                >
                  <Link className="nav-link" to="/checkticketstatus">
                    <i className="fa-sharp fa-solid fa-file-arrow-up"></i> Check
                    Ticket Status
                  </Link>
                </li>
                <li className="nav-item ms-5" >
                  <Link className="nav-link"  to="/login" style={{color:"#0072bc"}}>
                  <i class="fa-solid fa-right-to-bracket"></i> Login
                  </Link>
                  </li>
                <li className="nav-item ms-2"><Client/></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
