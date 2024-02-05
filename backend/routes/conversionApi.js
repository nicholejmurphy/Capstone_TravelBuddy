"use strict";

require("dotenv").config();

/** Routes for ExchangeRate API. */
const express = require("express");
const axios = require("axios");
const router = express.Router();
const secret_key = process.env.CONVERTER_API_KEY;

const BASE_URL = `http://api.exchangerate.host/convert?access_key=${secret_key}`;

/** GET / {} =>
 *    { {success}, {query}, {result} }
 *
 **/
router.get("/", async function (req, res, next) {
  const { to, from, amount } = req.query;
  try {
    const result = await axios.get(
      `${BASE_URL}&from=${from}&to=${to}&amount=${amount}`
    );
    return res.json(result.data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
