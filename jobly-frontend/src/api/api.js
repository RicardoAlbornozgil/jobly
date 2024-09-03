import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/** API Class.
 *
 * A static class containing methods for interacting with the Jobly API.
 * Centralizes all API requests, ensuring consistency and ease of maintenance.
 */

class JoblyApi {
  // The token used for authenticating API requests.
  static token;

  /**
   * Generic method for making API requests.
   * 
   * @param {string} endpoint - The API endpoint.
   * @param {object} [data={}] - The data to be sent with the request.
   * @param {string} [method="get"] - The HTTP method (GET, POST, PATCH, etc.).
   * @returns {Promise} - The data from the API response.
   * @throws {Error} - If the API request fails.
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response?.data?.error?.message || "An unexpected error occurred.";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user by username. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get a list of companies, optionally filtered by name. */
  static async getCompanies(name) {
    const res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a specific company by its handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of jobs, optionally filtered by title. */
  static async getJobs(title) {
    const res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a job by job ID for a specific user. */
  static async applyToJob(username, id) {
    return await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Get a token for login from username and password. */
  static async login(data) {
    try {
      const res = await this.request(`auth/token`, data, "post");
      if (res.token) {
        this.token = res.token;
        return { success: true, token: res.token };
      } else {
        return { success: false, errors: res.errors || ["Login failed"] };
      }
    } catch (errors) {
      return { success: false, errors };
    }
  }
  
  /** Register a new user. */
  static async signup(data) {
    try {
      const res = await this.request(`auth/register`, data, "post");
      return { success: true, token: res.token };
    } catch (errors) {
      return { success: false, errors };
    }
  }


  /** Save user profile data for a specific user. */
  static async saveProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;
