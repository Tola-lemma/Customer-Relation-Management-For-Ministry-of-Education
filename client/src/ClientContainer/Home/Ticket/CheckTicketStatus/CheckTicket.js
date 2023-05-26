import React from "react";
import { NavBar } from "../../../HeaderAndFooter/header/NavBar";
import "./CheckTicket.css";
import { Link } from "react-router-dom";
import { Footer } from "../../../HeaderAndFooter/footer/Footer";
export const CheckTicket = () => {
  return (
   <>
    <div>
      <NavBar />
      <div className="container">
        <div className="ticketStatus">
          <h1>Check Ticket Status</h1>
          <p>
            Please provide your email address and a ticket number. An access
            link will be emailed to you.
          </p>
        </div>
        <div className="ticketstatusForm">
          <form>
          <div className="mb-3 CheckStatusform">
            <label htmlFor="checkticketInput" className="form-label">
              Email address:{" "}
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="checkticketInput"
              placeholder="someone.example@example.com"
              required
            />
            <label htmlFor="checkticketInput" className="form-label mt-3">
              Ticket Number:{" "}
            </label>
            <input
              type="number"
              className="form-control rounded-pill"
              id="checkticketInput"
              placeholder="eg. 19231920"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary rounded-pill emailAccesbtn">Email Access Link</button>
          </form>
        </div>
        <p className="mt-4">
          If this is your first time contacting us or you've lost the ticket
          number, please{" "}
          <Link to="/opennewticket" className="toOpenTicketRoute">
            open a new ticket
          </Link>{" "}
        </p>
      </div>
    </div>
   <Footer/>
   </>
   
  );
};
