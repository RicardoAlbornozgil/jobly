import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Higher-Order Component for private routes.
 *
 * This component checks if there is a valid current user and only continues to the
 * route if so. If no user is present, it redirects to the login form.
 */

function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);

  console.debug("PrivateRoute", "currentUser=", currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
