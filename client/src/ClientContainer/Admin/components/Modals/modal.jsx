import React, { useContext, useState } from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import axios from "axios";
import { Roles } from "../../Pages/global/Roles";
import CustomButton from "../../Pages/global/Button";
const Modal = ({ modalTitle, selectedRow}) => {
  const { userId, role } = selectedRow || {};
  const [selectedRole, setSelectedRole] = useState(role);
  const { showSuccess,showError} = useContext(ErrorContext);
  const [updating, setUpdating] = useState(false);
  const curretRole = role
  const handleUpdate = async () => {
    if (userId) {
      try {
        setUpdating(true);
        const response = await axios.post(`/admin/update-role/${userId}`, { role:selectedRole },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showSuccess("Role updated successfully!"||response.msg)
      } catch (error) {
        showError(error.message ||"Unable to update role please try again")
      }
      finally {
        setUpdating(false); // Set updating back to false after the API call completes
      }
    }
  };
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
                <span className="input-group-text">Role:</span>
                <select className="form-select" value={selectedRole} 
                 onChange={(e) => setSelectedRole(e.target.value)}
                 >
                {
                  Object.keys(Roles).map(role =>  (
                    <option value={role} key={role} selected={curretRole === role}>{Roles[role]}</option>
                  ))
                  }
                </select>
              </div>
            </div>
            <CustomButton className="btn-primary float-end" onClick={handleUpdate} disabled={updating} loading={updating}>
              Update
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
