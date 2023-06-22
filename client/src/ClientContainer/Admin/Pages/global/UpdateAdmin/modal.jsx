import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../Admin/Pages/global/LoginContext";
import axios from "axios";
import { ErrorContext } from "../../../../Admin/ToastErrorPage/ErrorContext";
import CustomButton from "../../../../Admin/Pages/global/Button";
import { ErrorMessage } from "../../../../Admin/ToastErrorPage/ErrorMessage";

const Modal = () => {
  const [updating, setUpdating] = useState(false);
  const { showError,showSuccess } = useContext(ErrorContext);
  const { login, user } = useContext(UserContext);
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const { name, phoneNumber, email } = values;
  useEffect(() => {
    if (user.username && user.email && user.phoneNumber) {
      setValues({
        name: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleUpdate =async (e) => {
    e.preventDefault();
  try {
    setUpdating(true);
    const response = await axios.put(
      "/admin/update-account",
      {
        ...values
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
   const {msg} =response.data
   login(name,user.role,email)
   showSuccess( msg || "Account updated successfully!.");
  } catch (error) {
    showError(error?.response?.data?.msg);
  }
  finally {
    setUpdating(false); 
 } 
};
  return (
    <div
      className="modal fade"
      id="UpdateAdmin"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h3 className="modal-title">{user.username}</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
          <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-90 bd-highlight">
                  <div className="input-group mb-3" >
                    <span className="input-group-text">Full Name:</span>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Email:     </span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Phone Number:</span>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
            </div>
          </div>
          <p style={{marginLeft:"1rem" ,fontSize:"1.5rem",fontWeight:"bold",fontStyle:"italic"}}><a href="/change-password" style={{textDecoration:"none"}}>Want change password?</a></p>
          <div className="modal-footer">
            <CustomButton
              className="btn btn-success"
              onClick={handleUpdate}
              disabled={updating} loading={updating}
            >
              Update
            </CustomButton>
            <button
             className="btn btn-warning"
              disableElevation
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <ErrorMessage />
    </div>
  );
};

export default Modal;
