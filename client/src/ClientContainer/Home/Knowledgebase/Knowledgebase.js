import React from "react";
import "./Knowledgebase.css";
import { NavBar } from "../../HeaderAndFooter/header/NavBar";
import { HashLink as Link } from "react-router-hash-link";
import { Footer } from "../../HeaderAndFooter/header/Footer/Footer";
export const Knowledgebase = () => {
  return (
    <div>
      <NavBar />
      <div className="container knowledgebase">
        <div className="knowledgebase-parent">
          <div>
            <div className="allFAQ mb-3">
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
                    <u>Regarding representation</u>
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
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600" }}
                ></i>
                <Link to="#transfer" className="kb" smooth>
                  {" "}
                  Transfer of teachers and students
                </Link>
              </h4>
              <div className="kb_paragraph" id="transfer">
                <p>
                  <li>
                    <Link
                      className="kb"
                      data-bs-toggle="collapse"
                      to="#teacher"
                      aria-expanded="false"
                      aria-controls="teacher"
                    >
                      Teacher transfer request
                    </Link>
                  </li>
                </p>
                <div className="collapse" id="teacher">
                  <div className="card card-body kb_paragraph">
                    <ol>
                      <div
                        className="rounded-pill"
                        style={{ backgroundColor: "#D9D9D9" }}
                      >
                        <h4 style={{ marginLeft: "2rem" }}>
                          Teacher transfer request
                        </h4>
                      </div>
                      <hr className="shadow-lg" />
                      <p>
                        <li>
                          A letter of approval for the institution where he/she
                          is working
                        </li>
                      </p>
                      <p>
                        <li>
                          A letter stating that the receiving institution is
                          willing to accept
                        </li>
                      </p>
                      <p>
                        <li>
                          A letter stating how much debt and service time he
                          owes to the applicant institution and showing that he
                          is willing to pay to the recipient.
                        </li>
                      </p>
                      <p>
                        <li>
                          Evidence of medical board from government health
                          institutions confirming that he cannot work in the
                          environment
                        </li>
                      </p>
                    </ol>
                  </div>
                </div>

                <p>
                  <li>
                    <Link
                      className="kb"
                      data-bs-toggle="collapse"
                      to="#student"
                      aria-expanded="false"
                      aria-controls="student"
                    >
                      Student transfer request
                    </Link>
                  </li>
                </p>
                <div className="collapse" id="student">
                  <div className="card card-body kb_paragraph">
                    <ol>
                      <div
                        className="rounded-pill"
                        style={{ backgroundColor: "#D9D9D9" }}
                      >
                        <h4 style={{ marginLeft: "2rem", color: "black" }}>
                          Student transfer request
                        </h4>
                      </div>
                      <hr className="shadow-lg" />
                      <p>
                        <li>
                          Providing medical board evidence from government
                          health institutions that proves that he cannot study
                          in the environment
                        </li>
                      </p>
                      <p>
                        <li>
                          A letter showing that the receiving institution is
                          authorized
                        </li>
                      </p>
                      <p>
                        <li>
                          Confirm that the student's information is free from
                          any academic and administrative errors for the Q
                          institution and send it to the receiving institution.
                        </li>
                      </p>
                    </ol>
                  </div>
                </div>
              </div>
              <hr className="shadow-lg" />
              <h4>
                <i
                  className="fa-sharp fa-regular fa-folder-open"
                  style={{ color: "#e0c600" }}
                ></i>
                <Link to="#scholarship" className="kb" id="scholarship">
                  {" "}
                  Scholarship Question{" "}
                </Link>
              </h4>
              <div className="kb_paragraph">
                <p>
                  <li>Proof that the scholarship is a full scholarship </li>
                </p>
                <p>
                  <li>Letter of admission</li>
                </p>

                <p>
                  <li>
                    Letter of support from the institution where he/she works{" "}
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
                <Link to="#complaints" className="kb">
                  {" "}
                  Various academic and administrative complaints{" "}
                </Link>
              </h4>
              <div className="kb_paragraph" id="complaints">
                <span className="kb_strong_paragraph">
                  <strong>
                    Regarding unresolved problems and complaints regarding good
                    governance;{" "}
                  </strong>
                </span>

                <p>
                  <li>
                    The issue was presented to the management/complaint hearing
                    committee at all levels and the senior management of the
                    institution.{" "}
                  </li>
                </p>

                <p>
                  <li>
                    A decision presented to the management of the institution's
                    board
                  </li>
                </p>
                <p>
                  <li>
                    A document explaining the issue that the person claims
                  </li>
                </p>
                <p>
                  <li>
                    Documentary evidence to provide suggestions for good
                    management deficiencies in any service provision
                  </li>
                </p>
              </div>
            </ul>
          </div>
          <div className="selectByTopic dropdown">
            <button
              className="btn dropdown-toggle"
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
        </div>
      </div>
      <Footer />
    </div>
  );
};