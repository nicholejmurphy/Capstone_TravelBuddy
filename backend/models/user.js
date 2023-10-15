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

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { id, username, first_name, last_name, location_id, location_name }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT id, 
              username,
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              location_id AS "locationId",
              location_name AS "locationName"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Signup user with data.
   *
   * Returns { id, username, firstName, lastName }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async signup({ username, password, firstName, lastName }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name)
           VALUES ($1, $2, $3, $4)
           RETURNING id, username, first_name AS "firstName", last_name AS "lastName"`,
      [username, hashedPassword, firstName, lastName]
    );

    const user = result.rows[0];

    return user;
  }

  /** Given a user id, return data about user.
   *
   * Returns { username, first_name, last_name, location_id, location_name }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(user_id) {
    const userRes = await db.query(
      `SELECT id,
              username,
              first_name AS "firstName",
              last_name AS "lastName",
              location_id AS "locationId",
              location_name AS "locationName"
           FROM users
           WHERE id = $1`,
      [user_id]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`User not found. id: ${user_id}`);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, location_id, location_name }
   *
   * Returns { id, username, firstName, lastName, locationId, locationName }
   *
   * Throws NotFoundError if not found.
   *
   */

  static async update(user_id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      locationId: "location_id",
      locationName: "location_name",
    });
    const userIdVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${userIdVarIdx} 
                      RETURNING id,
                                username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                location_id AS "locationId",
                                location_name AS "locationName"`;
    const result = await db.query(querySql, [...values, user_id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User not found. id: ${user_id}`);

    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(user_id) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE id = $1
           RETURNING username`,
      [user_id]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User not found. id: ${user_id}`);
  }

  /** Get all saved locations for user from database: returns locations.
   *
   **/
  static async getSavedLocations(user_id) {
    let result = await db.query(
      `SELECT l.location_id AS locationId,
              l.name
              FROM saved_locations AS "l"
              WHERE l.user_id = $1`,
      [user_id]
    );

    return result.rows;
  }

  /** Get all saved translations for user from database: returns translations.
   *
   **/
  static async getSavedTranslations(user_id) {
    let result = await db.query(
      `SELECT t.from_language AS fromLanguage,
              t.to_language AS toLanguage,
              t.from_text AS fromText,
              t.to_text AS toText
              FROM saved_translations AS "t"
              WHERE t.user_id = $1`,
      [user_id]
    );

    return result.rows;
  }

  /** Get all saved conversions for user from database: returns conversions.
   *
   **/
  static async getSavedConversions(user_id) {
    let result = await db.query(
      `SELECT c.from_currency AS fromCurrency,
              c.to_currency AS toCurrency,
              c.from_amount AS fromAmount,
              c.to_amount AS toAmount
              FROM saved_conversions AS "c"
              WHERE c.user_id = $1`,
      [user_id]
    );

    return result.rows;
  }
}

module.exports = User;
