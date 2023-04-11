import React from "react";
import { NavBar } from "../../../HeaderAndFooter/header/NavBar";
import "./CheckTicket.css";
import { Link } from "react-router-dom";
export const CheckTicket = () => {
  return (
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
          <div class="mb-3 CheckStatusform">
            <label for="checkticketInput" className="form-label">
              Email address:{" "}
            </label>
            <input
              type="email"
              className="form-control"
              id="checkticketInput"
              placeholder="someone.example@example.com"
            />
            <label for="checkticketInput" class="form-label mt-3">
              Ticket Number:{" "}
            </label>
            <input
              type="number"
              className="form-control"
              id="checkticketInput"
              placeholder="eg. 19231920"
            />
          </div>
          <button className="btn btn-primary rounded-pill emailAccesbtn">Email Access Link</button>
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
  );
};
