import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class for ExchangeRate.host API calls from backend.
 *
 * Static class tying together methods used to send requests to
 * the backend server which calls to the ExchangeRate.host API.
 *
 */
class ConversionApi {
  static async request(endpoint, data = {}, method = "get") {
    // passing authorization token through the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { accept: "application/json" };
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

  /** Get a currency conversion given a to, from, and amount
   *
   * - Sends request to backend which triggers and API
   *   call to ExchangeRate.host convert endpoint
   * - Data = {to: "CODE", from: "CODE", amount: "float"}
   *
   */
  static async get() {
    let conversion = await this.request(`conversions/`, data);
    return conversion;

    // A mock API response for testing

    // const conversion = {
    //   conversion: {
    //     success: "true",
    //     query: {
    //       to: "USA",
    //       from: "EUR",
    //       amount: 23490,
    //     },
    //     result: 278391,
    //   },
    // };
  }
}

export default ConversionApi;
