import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class for API Ninjas API calls from backend.
 *
 * Static class tying together methods used to send requests to
 * the backend server which calls to the Ninjas API.
 *
 */
class TriviaApi {
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

  /** Get a random trivia question and answer
   *
   * - Sends request to backend which triggers and API
   *   call to API Ninjas trivia endpoint
   */
  static async get() {
    let trivia = await this.request(`trivia/`);
    // A mock API response for testing
    // const trivia = {
    //   trivia: {
    //     question: "What is the capital of France?",
    //     answer: "Paris",
    //   },
    // };
    return trivia;
  }
}

export default TriviaApi;
