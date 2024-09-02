import React, { useState, useContext } from "react";

/** Context: provides currentUser object and setter for it throughout the app. */

const UserContext = React.createContext(null);

/** Hook to access the UserContext */
export const useUser = () => {
  return useContext(UserContext);
};

/** UserProvider component to wrap around components needing access to UserContext */
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
