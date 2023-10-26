"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");

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
   * Returns { locationId }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async add(userId, locationId) {
    const duplicateCheck = await db.query(
      `SELECT id
           FROM saved_locations
           WHERE user_id = $1 AND id = $2`,
      [userId, locationId]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate location: ${locationId}`);
    }

    const result = await db.query(
      `INSERT INTO saved_locations
           (user_id,
            id)
           VALUES ($1, $2)
           RETURNING id`,
      [userId, locationId]
    );

    const location = result.rows[0];

    return location;
  }

  /** Given a user id, return data about user's saved locations.
   *
   * Returns { id }
   *
   * Throws NotFoundError if not found.
   **/

  static async getAll(user_id) {
    // try to find the user first
    const result = await db.query(
      `SELECT id 
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
           WHERE user_id = $1 AND id = $2
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
