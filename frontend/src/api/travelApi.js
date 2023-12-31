import axios from "axios";

// Mock API response imports for dev mode
// import { searchRes, photosRes, detailsRes, reviewsRes } from "./mockTravelApi";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class for TripAdvisor API calls from backend.
 *
 * Static class tying together methods used to send requests to
 * the backend server which calls to the TripAdvisor API.
 *
 */
class TravelApi {
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

  /** Location Search. { searchTerm, category } =>
   *    { [{ location1 }, {location2 }] }
   *
   * category options: { geos, attractions, restaurants, hotels }
   * >>> TIP: For a general search, use category: geos to yield
   *     general geographical locations
   */
  static async searchLocation(searchTerm, category) {
    // Update searchTerm to be URL encoded if a space existis
    searchTerm = searchTerm.trim().replace(/\s+/g, "%20").replace(/,/g, "%2C");
    let res = await this.request(`locations/search/${searchTerm}/${category}`);
    const locations = res.locations.data;
    return locations;
    // return searchRes;
  }

  /** Location Details. { locationId } => { locationDetails } */
  static async getLocationDetails(locationId) {
    try {
      let res = await this.request(`locations/details/${locationId}`);
      return res.location;
    } catch (error) {
      return {
        location_id: locationId,
        name: null,
      };
    }
    // return detailsRes;
  }

  /** Location Photos. { locationId } => { locationPhotos } */
  static async getLocationPhotos(locationId) {
    let res = await this.request(`locations/photos/${locationId}`);
    return res.photos.data;
    // return photosRes;
  }

  /** Location Reviews. { locationId } => { locationReviews } */
  static async getLocationReviews(locationId) {
    let res = await this.request(`locations/reviews/${locationId}`);
    return res.reviews.data;
    // return reviewsRes;
  }
}

export default TravelApi;
