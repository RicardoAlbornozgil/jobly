import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import "../../styles/Auth.css";

/** Signup form.
 *
 * Shows form and manages updates to state on changes.
 * On submission:
 * - Calls signup function prop
 * - Redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=", typeof signup,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls signup func prop and, if successful, redirects to /companies.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="main">
      <div className="SignupForm">
        <div className="form-card container col-md-6 col-lg-4">
          <h2 className="mb-3">Sign Up</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-groups">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {formErrors.length > 0 && (
                    <Alert type="danger" messages={formErrors} />
                  )}
                </div>

                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
