import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import Navigation from "../routes-nav/Navigation";
import Routes from "../routes-nav/AppRoutes";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../../api/api";
import UserContext from "../auth/UserContext";
import jwt from "jsonwebtoken";
import "../../styles/App.css";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * This component handles the main logic for managing the app's state and
 * authentication. It also sets up routes and manages the global user context.
 *
 * - infoLoaded: boolean to track if user data has been fetched from API.
 * - currentUser: holds the logged-in user's data.
 * - token: JWT token for authenticated API requests. Synced with localStorage.
 *
 * The app consists of:
 * - Routes: manages routing between different pages.
 * - Navigation: renders the navigation bar with the current user context.
 */
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false); // Track if user info is loaded
  const [applicationIds, setApplicationIds] = useState(new Set([])); // Holds applied job IDs
  const [currentUser, setCurrentUser] = useState(null); // Stores current user info
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID); // JWT token, synced with localStorage

  console.debug("App", "infoLoaded=", infoLoaded, "currentUser=", currentUser, "token=", token);

  /** Load user info from API on token change.
   *  Runs only when token changes (e.g., login, signup, or logout).
   */
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    /** Fetch current user information based on JWT token. */
    async function getCurrentUser() {
      if (token && typeof token === "string") {
        try {
          const decodedToken = jwt.decode(token);
          if (decodedToken) {
            const { username } = decodedToken; // Destructure username from the decoded token
            JoblyApi.token = token; // Set the token in API for authenticated requests
            let currentUser = await JoblyApi.getCurrentUser(username); // Fetch user info from API
            setCurrentUser(currentUser); // Set current user state
            setApplicationIds(new Set(currentUser.applications)); // Store applied job IDs
          } else {
            console.error("Invalid token: Could not decode.");
            setCurrentUser(null); // Reset user state on invalid token
          }
        } catch (err) {
          console.error("App loadUserInfo: error loading user data", err);
          setCurrentUser(null); // Reset user state on error
        }
      } else {
        console.error("Invalid or missing token.");
        setCurrentUser(null); // Reset user state if no token
      }
      setInfoLoaded(true); // Mark user data as loaded (even if an error occurs)
    }

    setInfoLoaded(false); // Reset loading state before fetching data
    getCurrentUser(); // Fetch the user data
  }, [token]);

  /** Logs the user out by clearing the user state and token. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles user signup. 
   * 
   * @param {Object} signupData - The user data for signup
   * @returns {Object} - Success status and possible errors
   */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      if (token && typeof token === "string") {
        setToken(token); // Store the token in localStorage
        return { success: true };
      } else {
        console.error("signup failed: invalid token format");
        return { success: false, errors: ["Invalid token format"] };
      }
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles user login. 
   * 
   * @param {Object} loginData - The user data for login
   * @returns {Object} - Success status and possible errors
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      if (token && typeof token === "string") {
        setToken(token); // Store the token in localStorage
        return { success: true };
      } else {
        console.error("login failed: invalid token format");
        return { success: false, errors: ["Invalid token format"] };
      }
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if the user has already applied to a job by its ID. 
   * 
   * @param {Number} id - Job ID
   * @returns {Boolean} - True if job has been applied to, otherwise false
   */
  function hasAppliedToJob(id) {
    return applicationIds.has(id); // Return true if the job ID is in the applied jobs set
  }

  /** Apply to a job and update the application IDs state. 
   * 
   * @param {Number} id - Job ID
   */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return; // If already applied, do nothing
    JoblyApi.applyToJob(currentUser.username, id); // Make API call to apply
    setApplicationIds(new Set([...applicationIds, id])); // Add job ID to application IDs set
  }

  // Display a loading spinner while user info is being fetched
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
