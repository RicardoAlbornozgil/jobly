import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import "../../styles/Auth.css";

/** Login form.
 *
 * Shows form and manages updates to state on changes.
 * On submission:
 * - Calls login function prop
 * - Redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug("LoginForm", "login=", typeof login, "formData=", formData, "formErrors=", formErrors);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirects to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  return (
    <div className="main">
      <div className="LoginForm">
        <div className="form-card container col-md-6 col-lg-4">
          <h2 className="mb-3">Log In</h2>
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
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary btn-block">
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

export default LoginForm;
