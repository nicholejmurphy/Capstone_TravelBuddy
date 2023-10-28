"use strict";

/** Routes for TripAdvisor API. */
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { TRIVIA_API_KEY } = require("./keys");

const BASE_URL = "https://api.api-ninjas.com/v1/trivia?category=geography";

/** GET / {} =>
 *    { category, question, answer }
 *
 **/
router.get("/", async function (req, res, next) {
  try {
    const resp = await axios.get(BASE_URL, {
      headers: { "X-Api-Key": TRIVIA_API_KEY },
    });
    return res.json(resp);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
