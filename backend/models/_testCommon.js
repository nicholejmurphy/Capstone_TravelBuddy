const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM saved_locations");

  await db.query(
    `INSERT INTO users (username,
                          password,
                          first_name,
                          last_name)
        VALUES ('u1', $1, 'U1F', 'U1L'),
               ('u2', $2, 'U2F', 'U2L')`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );
  const user = await db.query(`SELECT * FROM users WHERE username = 'u2'`);
  await db.query(
    `INSERT INTO saved_locations (user_id, location_id, name, address_string)
                  VALUES ($1, 'test_id', 'test_location', 'test_address')`,
    [user.rows[0].id]
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
