import React, {useState,useContext} from "react";
import { NavBar } from "../../../HeaderAndFooter/header/NavBar";
import "./CheckTicket.css";
import { Link } from "react-router-dom";
import { Footer } from "../../../HeaderAndFooter/footer/Footer";
import axios from "axios";
import { ErrorMessage } from "../../../Admin/ToastErrorPage/ErrorMessage";
import { ErrorContext } from "../../../Admin/ToastErrorPage/ErrorContext";
import ModalButton from "./ModalData/modalButton";
import Modal from "./ModalData/modal";
export const CheckTicket = () => {
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState("");
  const [requestedIssue, setRequestedIssue] = useState("");
  const { showError} = useContext(ErrorContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/issue/track-issue`, { ticket, email });
      const { requestedIssue } = response.data;
      console.log(requestedIssue.name);
      setRequestedIssue(requestedIssue);
    } catch (error) {
      showError(error.message || "Unable to see the status please try again");
    }
  };
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
          <form onSubmit={handleSubmit}>
          <div className="mb-3 CheckStatusform">
            <label htmlFor="checkticketInput" className="form-label">
              Email address:{" "}
            </label>
            <input
              type="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control rounded-pill"
              id="checkticketInput"
              placeholder="someone.example@example.com"
              required
            />
            <label htmlFor="checkticketInput" className="form-label mt-3">
              Ticket Number:{" "}
            </label>
            <input
              type="text"
              name="ticket"
              onChange={(e)=>setTicket(e.target.value)}
              className="form-control rounded-pill"
              id="checkticketInput"
              placeholder="eg. 192a6buY5"
              required
              />
          </div>
          <ModalButton />
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
        <Modal
          requestedIssue={requestedIssue}
        />

    <ErrorMessage/>
   <Footer/>
   </>
   
  );
};