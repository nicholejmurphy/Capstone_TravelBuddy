import axios from "axios";
import { TRAVEL_API_KEY } from "../keys";

const BASE_URL = "https://api.content.tripadvisor.com/api/v1/location";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the TripAdvisor API.
 *
 */
class TravelApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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

  /** Location Search. { name, category } =>
   *    { data: [{ location1 }, {location2 }] }
   *
   * category options: { geos, attractions, restaurants, hotels }
   * >>> TIP: For a general search, use category: geos to yield
   *     general geographical locations
   */
  static async searchLocation(name, category) {
    // Update name to be URL encoded if a space existis
    name = name.trim().replace(/\s+/g, "%20");
    let res = await this.request(
      `search?key=${TRAVEL_API_KEY}&searchQuery=${name}%20nj&category=${category}}&language=en`
    );
    return res.data;
  }

  /** Location Details. { locationId } => { locationDetails } */
  static async getLocationDetails(locationId) {
    let res = await this.request(
      `${locationId}/details?key=${TRAVEL_API_KEY}&language=en&currency=USD`
    );
    return res;
  }

  /** Location Photos. { locationId } => { locationPhotos } */
  static async getLocationPhotos(locationId) {
    let res = await this.request(
      `${locationId}/photos?key=${TRAVEL_API_KEY}&language=en`
    );
    return res.data;
  }

  /** Location Reviews. { locationId } => { locationReviews } */
  static async getLocationReviews(locationId) {
    let res = await this.request(
      `${locationId}/reviews?key=${TRAVEL_API_KEY}&language=en`
    );
    return res.data;
  }
}

export default TravelApi;
