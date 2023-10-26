"use strict";

const db = require("../db.js");
const User = require("../models/user");
const SavedLocation = require("../models/savedLocation.js");
const { createToken } = require("../helpers/tokens");

const users = {};
const userTokens = {};

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM saved_locations");

  await User.signup({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    password: "password1",
  });
  await User.signup({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    password: "password2",
  });
  await User.signup({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    password: "password3",
  });

  users.user1 = await User.authenticate("u1", "password1");
  users.user2 = await User.authenticate("u2", "password2");

  const newLocation = {
    locationId: "test_id",
  };

  await SavedLocation.add(users.user1.id, newLocation);

  userTokens.u1Token = createToken(users.user1);
  userTokens.u2Token = createToken(users.user2);
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
  users,
  userTokens,
};
