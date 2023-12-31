"use strict";

require("dotenv").config();

/** Routes for TripAdvisor API. */
const express = require("express");
const axios = require("axios");
const router = express.Router();
const secret_key = process.env.TRAVEL_API_KEY;

const BASE_URL = "https://api.content.tripadvisor.com/api/v1/location";

/** GET / { name, category } =>
 *    { [{ location1 }, {location2 }] }
 *
 **/
router.get("/search/:searchTerm/:category", async function (req, res, next) {
  try {
    const result = await axios.get(
      `${BASE_URL}/search?key=${secret_key}&searchQuery=${req.params.searchTerm}&category=${req.params.category}&language=en`
    );
    const locations = result.data;
    return res.json({ locations });
  } catch (err) {
    return next(err);
  }
});

/** GET / { locationId } => { locationDetails }
 *
 *  Returns location details.
 *
 **/
router.get("/details/:locationId", async function (req, res, next) {
  try {
    const result = await axios.get(
      `${BASE_URL}/${req.params.locationId}/details?key=${secret_key}&language=en&currency=USD`
    );
    const location = result.data;
    return res.json({ location });
  } catch (err) {
    return next(err);
  }
});

/** GET / { locationId } => { locationPhotos }
 *
 *  Returns location photos.
 *
 **/

router.get("/photos/:locationId", async function (req, res, next) {
  try {
    const result = await axios.get(
      `${BASE_URL}/${req.params.locationId}/photos?key=${secret_key}&language=en`
    );
    const photos = result.data;
    return res.json({ photos });
  } catch (err) {
    return next(err);
  }
});

/** GET / { locationId } => { locationReviews }
 *
 *  Returns location reviews.
 *
 **/

router.get("/reviews/:locationId", async function (req, res, next) {
  try {
    const result = await axios.get(
      `${BASE_URL}/${req.params.locationId}/reviews?key=${secret_key}&language=en&currency=USD`
    );
    const reviews = result.data;
    return res.json({ reviews });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
