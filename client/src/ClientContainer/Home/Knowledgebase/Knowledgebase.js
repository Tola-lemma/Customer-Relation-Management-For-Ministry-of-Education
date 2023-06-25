import React, { useEffect, useState } from "react";
import "./Knowledgebase.css";
import { NavBar } from "../../HeaderAndFooter/header/NavBar";
import { HashLink as Link } from "react-router-hash-link";
import { Footer } from "../../HeaderAndFooter/Footer/Footer";
import axios from "axios";
export const Knowledgebase = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/issue/service");
        setServices(response.data.services);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="container knowledgebase">
        <div className="knowledgebase-parent">
          <div>
            <div className="allFAQ mb-3">
          <div className="selectByTopic dropdown">
            <button
              className="btn dropdown-toggle kb_drp"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              --Browse by Topic--
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="#transfer">
                  Student transfer request
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#transfer">
                  Teacher transfer request
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#foreignstudents">
                  Request to return to work after studying abroad
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#scholarship">
                  Scholarship question
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#complaints">
                  Various academic and administrative complaints
                </Link>
              </li>
            </ul>
          </div>
              Click on the category to browse FAQs.
            </div>
            <ul>
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600" }}
                ></i>
                <Link to="#eligiblity" className="kb" id="eligiblity">
                  {" "}
                  ELIGIBILITY LETTER
                </Link>
              </h4>
              <div className="kb_paragraph">
                <span className="kb_strong_paragraph">
                  <strong>A. For undergraduate program</strong>
                </span>

                <p>
                  <li>
                    He/she has obtained the entry point of the institution of
                    higher education at the time
                  </li>
                </p>

                <p>
                  <li>
                    Cost sharing fee for the period of study if he/she has
                    entered a higher education institution,
                  </li>
                </p>

                <p>
                  <li>
                    Higher education institute admission point brought/brought
                    by the government
                  </li>
                </p>

                <p>
                  <li>Confirmation letter from higher education institution</li>
                </p>

                <span className="kb_strong_paragraph">
                  <strong>B. For second and third degree</strong>
                </span>

                <p>
                  <li>Application</li>
                </p>

                <p>
                  <li>
                    Confirmation and True copy of their degree from their Higher
                    Education Institution
                  </li>
                </p>
                <p>
                  <li>
                    Completing their service obligations / paying the cost
                    sharing fee
                  </li>
                </p>
              </div>
              <hr className="shadow-lg" />
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600" }}
                ></i>
                <Link to="#foreignstudents" className="kb" id="foreignstudents">
                  {" "}
                  For foreign students who are studying in different countries,
                  they must agree to get a letter of support when they come to
                  Ethiopia and return abroad
                </Link>
              </h4>
              <div className="kb_paragraph">
                <p>
                  <li>
                    A letter of support from the embassy of the country where
                    you are studying
                  </li>
                </p>

                <p>
                  <li>Letter of support from the institution where you work</li>
                </p>

                <p>
                  <li>Passport copy</li>
                </p>
              </div>
              <hr className="shadow-lg" />
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600" }}
                ></i>
                <Link to="#returntowork" className="kb" id="returntowork">
                  {" "}
                  A request to return to work after completing their studies
                  abroad
                </Link>
              </h4>
              <div className="kb_paragraph">
                <p>
                  <li>
                    A letter from the country/embassy showing that they have
                    completed their studies
                  </li>
                </p>

                <p>
                  <li>
                    The degree is verified by the relevant body/Authentication
                    and equivalent assessment from the education and training
                    authority
                  </li>
                </p>

                <p>
                  <li>Returning to work institution/university</li>
                </p>
              </div>

              <hr className="shadow-lg" />
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600" }}
                ></i>
                <Link to="" className="kb">
                  {" "}
                  Cost Sharing Service Requirements
                </Link>
              </h4>
              <div className="kb_paragraph">
                <p>
                  <li>
                    A non-returnable copy of the original transcript from the
                    university where you graduated{" "}
                  </li>
                </p>

                <p>
                  <li>Cost sharing agreement from the university,</li>
                </p>

                <p>
                  <li>
                    Expenditure sharing confirmation letter signed by the
                    officials who have served in higher education institutions.{" "}
                  </li>
                </p>

                <p>
                  <li>
                    A letter of agreement from both institutions for clients who
                    have been transferred from one institution to another
                    without completing their obligations
                  </li>
                </p>
                <p>
                  <li>
                    Cost sharing confirmation letter from zones or offices for
                    clients who have provided services in other educational and
                    health institutions.{" "}
                  </li>
                </p>

                <span className="kb_strong_paragraph">
                  <strong>
                    <p style={{fontSize:"1rem"}}>Regarding representation</p>
                  </strong>
                </span>

                <p>
                  <li>Legal power of attorney</li>
                </p>

                <p>
                  <li>Representative ID </li>
                </p>
                <p>
                  <li>
                    The representative's complete proof along with the original
                    and non-returnable copy{" "}
                  </li>
                </p>
              </div>

              <hr className="shadow-lg" />


{/* service from Backend */}

{services.length === 0 ? (
        <p>No services found</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service._id} style={{ listStyleType:"none" }}>
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600"}}
                ></i>
                <Link
                  to={`#${getTitle(service.requestType)}`}
                  className="kb"
                  id={getTitle(service.requestType)}
                >
                  {service.title}
                </Link>
              </h4>
              {service.description && (
                <div className="kb_paragraph" id={getTitle(service.requestType)}>
                  <span className="kb_strong_paragraph">
                   <h6><strong>{service.subTitle}</strong></h6>
                  </span>
                  {Array.isArray(service.description) ? (
                    <ul>
                      {service.description.map((item, index) => (
                        <li key={index}  style={{ listStyleType:"none" }}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {Object.entries(service.description).map(
                        ([key, value]) => (
                          <p>
                          <li key={key} style={{ listStyleType:"disc" }}>
                           {value}
                          </li>
                          </p>
                        )
                      )}
                    </ul>
                  )}
                </div>
              )}
              <hr className="shadow-lg" />
            </li>
          ))}
        </ul>
      )}
            </ul>
          </div> 

        </div>
      </div>
      <Footer />
    </div>
  );
};
const getTitle = (requestType) => {
  switch (requestType) {
    case "transferRequest":
      return "transfer";
    case "studyAbroadRequest":
      return "foreignstudents";
    case "scholarshipRequest":
      return "scholarship";
    case "complaintRequest":
      return "complaints";
    default:
      return "";
  }
  
};