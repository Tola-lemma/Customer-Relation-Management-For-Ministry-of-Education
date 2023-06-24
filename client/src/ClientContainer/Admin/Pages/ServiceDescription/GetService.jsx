import { Box } from "@mui/material";
import { Header } from "../../components/Header";
import { useContext, useState } from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
import axios from "axios";

export const SeeService = () => {
  const { showError } = useContext(ErrorContext);
  const [selectedRequestType, setSelectedRequestType] = useState("");
  const [service, setService] = useState([]);

  const fetchServiceDescription = async () => {
    try {
      const response = await axios.get(
        `/admin/service/${selectedRequestType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setService(response.data.service);
      // console.log(response.data.service);
    } catch (error) {
      console.log(error);
      showError(
        error?.response?.data?.msg || "Failed to fetch service description"
      );
    }
  };

  const handleSeeDescription = async () => {
    if (selectedRequestType) {
      await fetchServiceDescription();
    }
  };

  return (
    <Box m="20px">
      <Header
        title="See Service Description"
        subtitle="Admin can see service description"
      />

      <div className="container ms-3">
        <h2>See Specific Service Description</h2>
        <div className="mb-3">
          <label
            htmlFor="requestType"
            className="form-label"
            style={{ fontWeight: "bold" }}
          >
            Select Service Type to See Description
          </label>
          <select
            id="requestType"
            className="form-select"
            value={selectedRequestType}
            onChange={(event) => setSelectedRequestType(event.target.value)}
          >
            <option value="">Select Request Type</option>
            <option value="transferRequest">Transfer Request</option>
            <option value="studyAbroadRequest">Study Abroad Request</option>
            <option value="scholarshipRequest">Scholarship Request</option>
            <option value="complaintRequest">Complaint Request</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSeeDescription}
          disabled={!selectedRequestType}
        >
          See the Description
        </button>

        {service && (
          <div style={{ marginLeft: "2rem" }}>
            {service.map((serviceItem) => (
              <div key={serviceItem._id}>
                <h4 style={{ marginTop: "1rem" }}>
                  Title: {serviceItem.title}
                </h4>
                <h5>Request Type: {serviceItem.requestType}</h5>
                <h4>Description:</h4>
                {Object.entries(serviceItem.description).map(([key, value]) => (
                  <p key={key}>
                    <ul>
                      <li>{value}</li>
                    </ul>
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <ErrorMessage />
    </Box>
  );
};
