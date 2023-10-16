import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the backend API.
 *
 */
class UserApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    // passing authorization token through the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${UserApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** User login. { username, password } => { token }. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** User signup. { username, password, firstName, lastName } => { token }. */
  static async signup(data) {
    let res = await this.request(`auth/signup`, data, "post");
    return res.token;
  }

  /** Get current user details. */
  // {userId} => { id, username, first_name, last_name, location_id, location_name }
  static async getCurrUser(userId) {
    let res = await this.request(`users/${userId}`);
    return res.user;
  }

  /** Update user profile.
   * { firstName, lastName, location_id, location_name } =>
   * { id, username, firstName, lastName, locationId, locationName }. */
  static async updateProfile(userId, data) {
    let res = await this.request(`users/${userId}`, data, "patch");
    return res.user;
  }

  /** Delete user profile.
   * { userId } => { deleted: userId}
   */
  static async deleteProfile(userId) {
    let res = await this.request(`users/${userId}`, {}, "delete");
    return res.user;
  }
}

export default UserApi;
