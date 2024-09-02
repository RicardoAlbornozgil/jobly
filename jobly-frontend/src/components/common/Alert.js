import React from "react";
import "../../styles/Alert.css"

/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.length > 0 ? (
        messages.map((error, idx) => (
          <p className="mb-0 small" key={idx}>
            {error}
          </p>
        ))
      ) : (
        <p className="mb-0 small">No messages to display.</p>
      )}
    </div>
  );
}

export default Alert;
