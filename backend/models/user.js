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
   * Returns { id, username, first_name, last_name }
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
              last_name AS "lastName"
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
   * Returns { id, username, firstName, lastName }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(user_id) {
    const userRes = await db.query(
      `SELECT id,
              username,
              first_name AS "firstName",
              last_name AS "lastName"
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
   *   { firstName, lastName }
   *
   * Returns { id, username, firstName, lastName }
   *
   * Throws NotFoundError if not found.
   *
   */

  static async update(user_id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
    });
    const userIdVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${userIdVarIdx} 
                      RETURNING id,
                                username,
                                first_name AS "firstName",
                                last_name AS "lastName"`;
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
}

module.exports = User;
