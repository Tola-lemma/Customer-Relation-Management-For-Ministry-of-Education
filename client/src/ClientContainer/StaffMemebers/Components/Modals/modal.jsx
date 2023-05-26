import React from "react";

const Modal = ({ modalTitle, fullName, contactNumber, email, role, onUpdate }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h4 className="modal-title ms-5">{modalTitle}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="p-2 w-90 bd-highlight">
              <div className="input-group mb-3">
                <span className="input-group-text">Full Name:</span>
                <input type="text" className="form-control" value={fullName} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Contact Number:</span>
                <input type="tel" className="form-control" value={contactNumber} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input type="email" className="form-control" value={email} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Role:</span>
                <select className="form-select" value={role}>
                  <option>Transfer Coordinator</option>
                  <option>Study Abroad Coordinator</option>
                  <option>Scholarship Coordinator</option>
                  <option>Complaints Coordinator</option>
                </select>
              </div>
            </div>
            <button type="button" className="btn btn-primary float-end" onClick={onUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;