"use strict";

require("dotenv").config();

/** Routes for TripAdvisor API. */
const express = require("express");
const axios = require("axios");
const router = express.Router();
const secret_key = process.env.TRIVIA_API_KEY;

const BASE_URL = "https://api.api-ninjas.com/v1/trivia?category=geography";

/** GET / {} =>
 *    { category, question, answer }
 *
 **/
router.get("/", async function (req, res, next) {
  try {
    const result = await axios.get(BASE_URL, {
      headers: { "X-Api-Key": secret_key },
    });
    return res.json({ trivia: result.data[0] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
