"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for saved_locations
 *
 * Each location is associated with a user.
 *
 * Users may get, add, and delete saved locations
 * associated with their profile.
 *
 **/

class SavedLocation {
  /** Adds location to user's saved_location.
   *
   * Returns { id, locationId, name, addressString }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async add(userId, { locationId, name, addressString }) {
    const duplicateCheck = await db.query(
      `SELECT id
           FROM saved_locations
           WHERE user_id = $1 AND location_id = $2`,
      [userId, locationId]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate location: ${name}`);
    }

    const result = await db.query(
      `INSERT INTO saved_locations
           (user_id,
            location_id,
            name,
            address_string)
           VALUES ($1, $2, $3, $4)
           RETURNING id, location_id AS "locationId", name, address_string AS "addressString"`,
      [userId, locationId, name, addressString]
    );

    const location = result.rows[0];

    return location;
  }

  /** Given a user id, return data about user's saved locations.
   *
   * Returns { location_id, name, address_string }
   *
   * Throws NotFoundError if not found.
   **/

  static async getAll(user_id) {
    // try to find the user first
    const result = await db.query(
      `SELECT location_id AS "locationId",
              name, 
              address_string AS "addressString"
           FROM saved_locations
           WHERE user_id = $1`,
      [user_id]
    );

    const locations = result.rows;

    return locations;
  }

  /** Removes given saved location with given userId from database; returns undefined. */

  static async remove(userId, locationId) {
    let result = await db.query(
      `DELETE
           FROM saved_locations
           WHERE user_id = $1 AND location_id = $2
           RETURNING id`,
      [userId, locationId]
    );
    const location = result.rows[0];

    if (!location)
      throw new NotFoundError(
        `Location id ${locationId} not found for user ${userId}.`
      );
  }
}

module.exports = SavedLocation;
