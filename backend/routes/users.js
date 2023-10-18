"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** GET /[userId] => { user }
 *
 * Returns { id, username, firstName, lastName }
 *
 * Authorization required: same user-as-:userId
 **/

router.get("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.userId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[userId] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName }
 *
 * Returns { id, username, firstName, lastName }
 *
 * Authorization required: same-user-as-:userId
 **/

router.patch("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.userId, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[userId]  =>  { deleted: userId }
 *
 * Authorization requiredsame-user-as-:userId
 **/

router.delete("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.userId);
    return res.json({ deleted: req.params.userId });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
