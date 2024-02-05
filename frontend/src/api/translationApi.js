import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class for DeepL API requests from backend translation routes.
 *
 * Static class tying together methods used to send requests to
 * the backend server which requests to the DeepL API.
 *
 */
class TranslationApi {
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

  /** Get array of valid source languages from DeepL API
   *     => [{lanuage: "CODE", name: "NAME", supports_formality: BOOLEAN}]
   *
   */
  static async getSourceLanguages() {
    let sourceLanguages = await this.request(`translations/source-languages`);
    return sourceLanguages;
  }

  /** Get array of valid target languages from DeepL API
   *     => [{lanuage: "CODE", name: "NAME", supports_formality: BOOLEAN}]
   *
   */
  static async getTargetLanguages() {
    let targetLanguages = await this.request(`translations/target-languages`);
    return targetLanguages;
  }

  /** Get translation of text from source language to target language
   *    {to, from, text} => {detected_source_language, text}
   *
   */
  static async translate(data) {
    let translation = await this.request(`translations/translate`, data);
    return translation;
  }
}

export default ConversionApi;
