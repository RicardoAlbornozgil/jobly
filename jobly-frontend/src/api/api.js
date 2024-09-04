import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || 'https://jobly-backend-b589.onrender.com';

/** API Class.
 *
 * A static class containing methods for interacting with the Jobly API.
 * Centralizes all API requests, ensuring consistency and ease of maintenance.
 */

class JoblyApi {
  // The token for interacting with the API will be stored here.
  static token;

  /**
   * Make an API request.
   *
   * @param {string} endpoint - The API endpoint to hit.
   * @param {object} [data={}] - The data to send with the request.
   * @param {string} [method="get"] - The HTTP method to use for the request.
   * @returns {Promise<object>} - The response data from the API.
   * @throws {Array<string>} - An array of error messages from the API.
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      // Extract error message from response
      const message = err.response?.data?.error?.message || "Unknown error occurred";
      // Throw the error as an array of messages
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**
   * Get the current user by username.
   *
   * @param {string} username - The username of the user.
   * @returns {Promise<object>} - The user object.
   */
  static async getCurrentUser(username) {
    return await this.request(`users/${username}`).then(res => res.user);
  }

  /**
   * Get a list of companies, optionally filtered by name.
   *
   * @param {string} [name] - The name to filter companies by.
   * @returns {Promise<Array<object>>} - An array of company objects.
   */
  static async getCompanies(name) {
    return await this.request("companies", { name }).then(res => res.companies);
  }

  /**
   * Get details on a company by its handle.
   *
   * @param {string} handle - The handle of the company.
   * @returns {Promise<object>} - The company object.
   */
  static async getCompany(handle) {
    return await this.request(`companies/${handle}`).then(res => res.company);
  }

  /**
   * Get a list of jobs, optionally filtered by title.
   *
   * @param {string} [title] - The title to filter jobs by.
   * @returns {Promise<Array<object>>} - An array of job objects.
   */
  static async getJobs(title) {
    return await this.request("jobs", { title }).then(res => res.jobs);
  }

  /**
   * Apply to a job by ID for a specific user.
   *
   * @param {string} username - The username of the user.
   * @param {number} id - The ID of the job to apply to.
   * @returns {Promise<void>}
   */
  static async applyToJob(username, id) {
    return await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /**
   * Log in with username and password.
   *
   * @param {object} data - The login data (username, password).
   * @returns {Promise<string>} - The JWT token if login is successful.
   * @throws {Array<string>} - An array of error messages if login fails.
   */
  static async login(data) {
    return await this.request(`auth/token`, data, "post")
      .then(res => res.token)
      .catch(err => {
        console.error("Login failed:", err);
        throw err;
      });
  }

  /**
   * Sign up for a new account.
   *
   * @param {object} data - The signup data (username, password, etc.).
   * @returns {Promise<string>} - The JWT token if signup is successful.
   * @throws {Array<string>} - An array of error messages if signup fails.
   */
  static async signup(data) {
    return await this.request(`auth/register`, data, "post")
      .then(res => res.token)
      .catch(err => {
        console.error("Signup failed:", err);
        throw err;
      });
  }

  /**
   * Save the user's profile.
   *
   * @param {string} username - The username of the user.
   * @param {object} data - The updated profile data.
   * @returns {Promise<object>} - The updated user object.
   */
  static async saveProfile(username, data) {
    return await this.request(`users/${username}`, data, "patch").then(res => res.user);
  }
}

export default JoblyApi;
