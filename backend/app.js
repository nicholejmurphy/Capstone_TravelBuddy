"use strict";

/** Express app for TravelBuddy. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const savedLocations = require("./routes/savedLocations");
const travelApiRoutes = require("./routes/travelApi");
const triviaApiRoutes = require("./routes/triviaApi");
const conversionApiRoutes = require("./routes/conversionApi");
const translationApiRoutes = require("./routes/translationApi");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/savedLocations", savedLocations);
app.use("/locations", travelApiRoutes);
app.use("/trivia", triviaApiRoutes);
app.use("/conversions", conversionApiRoutes);
app.use("/translations", translationApiRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
