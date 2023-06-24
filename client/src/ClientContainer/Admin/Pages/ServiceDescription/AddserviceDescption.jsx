import { Box } from "@mui/material";
import { Header } from "../../components/Header";
import { useContext, useState } from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
import axios from "axios";

export const ServiceDescription = () => {
  const { showError, showSuccess } = useContext(ErrorContext);
  const [requestType, setRequestType] = useState("");
  const [descriptionKey, setDescriptionKey] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [descriptionObject, setDescriptionObject] = useState({});

  const handleRequestTypeChange = (e) => {
    setRequestType(e.target.value);
  };

  const handleDescriptionKeyChange = (e) => {
    setDescriptionKey(e.target.value);
  };

  const handleDescriptionValueChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleAddDescription = () => {
    if (descriptionKey && descriptionValue) {
      setDescriptionObject((prevObject) => ({
        ...prevObject,
        [descriptionKey]: descriptionValue,
      }));
      setDescriptionKey("");
      setDescriptionValue("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/admin/add-service",
        {
          requestType,
          description: descriptionObject,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showSuccess(response.data.msg);
      setRequestType("");
      setDescriptionObject({});
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box m="20px">
      <Header title="Service Description" subtitle="Admin can add service description to issue" />

      <div className="container ms-3">
        <h2>Add Service Descriptons</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="requestType" className="form-label" style={{fontWeight:"bold"}}>
              Request Type:
            </label>
            <select
              id="requestType"
              className="form-select"
              value={requestType}
              onChange={handleRequestTypeChange}
            >
              <option value="">Select Request Type</option>
              <option value="transferRequest">Transfer Request</option>
              <option value="studyAbroadRequest">Study Abroad Request</option>
              <option value="scholarshipRequest">Scholarship Request</option>
              <option value="complaintRequest">Complaint Request</option>
            </select>
          </div>
          <div className="row">
             <div className="col-md-6">
             <div className="mb-3">
            <label htmlFor="descriptionKey" className="form-label" style={{fontWeight:"bold"}}>
              Key:
            </label>
            <input
              type="text"
              className="form-control"
              id="descriptionKey"
              value={descriptionKey}
              onChange={handleDescriptionKeyChange}
            />
          </div>
             </div>
             <div className="col-md-6">
             <div className="mb-3">
            <label htmlFor="descriptionValue" className="form-label ms-3" style={{fontWeight:"bold"}}>
              Value:
            </label>
            <input
              type="text"
              className="form-control"
              id="descriptionValue"
              value={descriptionValue}
              onChange={handleDescriptionValueChange}
            />
          </div>
             </div>
          </div>   
       <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddDescription}
          >
            Add to List
          </button>
          <div>
            <h4>Description:</h4>
            <ul>
              {Object.entries(descriptionObject).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Description
          </button>
        </form>
        </div>
      <ErrorMessage />
      <div style={{marginTop:"1rem",backgroundColor:"wheat",width:"60%",textAlign:"center",display: 'block', margin: '0 auto' }}>
          <a href="/admin/delete-service" style={{textDecoration:"none",fontSize:"2rem",fontStyle:"italic"}}>Do you want to Delete Sevice? Click here </a>
      </div>
      <div style={{backgroundColor:"wheat",width:"60%",textAlign:"center", display: 'block', margin: '0 auto',marginTop:"2rem" }}>
          <a href="/admin/retrive-service" style={{textDecoration:"none",fontSize:"2rem",fontStyle:"italic"}}>Do you want to see Sevice? Click here </a>
      </div>
    </Box>
  );
};
