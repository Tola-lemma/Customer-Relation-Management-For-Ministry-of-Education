import { Link } from "react-router-dom"
import logo from '../../.././assets/images/MoELogo.png'
import './header.css'
export const NavBar =() => {
  return (
    <div className="navBackground shadow-sm">
    <div className="container">
     <nav className="navbar navbar-expand-lg font-weight-bold ">
        <div className="container-fluid ml-3 " >
        <Link to="/"><img src={logo} alt="Avatar Logo" style={{width:"5.7rem"}} className="rounded-pill"/></Link>
        <span className="Logo_Side_text">
        <span>  Customer Relation Management</span><br/>
        <span > For</span><br/>
        <span> Ministry Of Education</span>
        </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link ml-3 " aria-current="page" to="/">Support Center Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ml-3 " to="/">Knowledgebase</Link>
              </li>
              <li className="nav-item ml-3 ">
                <Link className="nav-link" to="/">Open New Ticket</Link>
               </li>
               <li className="nav-items ml-3">
                 <Link className="nav-link" to="/">Check Ticket Status</Link>
               </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </div>
  )
}
