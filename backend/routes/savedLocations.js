"use strict";

/** Routes for user's saved locations. */

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const SavedLocation = require("../models/savedLocation");

const router = express.Router();

/** GET /[userId] => { locations }
 *
 * Retrieves all locations saved by user
 * Returns [{ location_id, name, address_string }]
 *
 * Authorization required: same user-as-:userId
 **/

router.get("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    const locations = await SavedLocation.getAll(req.params.userId);
    return res.json({ locations });
  } catch (err) {
    return next(err);
  }
});

/** POST /[userId] {data} => { location }
 *
 * Returns { id, location_id, name, address_string }
 *
 * Authorization required: same user-as-:userId
 **/

router.post("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    const location = await SavedLocation.add(req.params.userId, {
      ...req.body,
    });
    return res.json({ location });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[locationId]/[userId]  =>  { deleted: location locationId for user userId }
 *
 * Authorization required: same-user-as-:userId
 **/

router.delete(
  "/:locationId/:userId",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      await SavedLocation.remove(req.params.userId, req.params.locationId);
      return res.json({
        deleted: `Location ${req.params.locationId} for User ${req.params.userId}`,
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
