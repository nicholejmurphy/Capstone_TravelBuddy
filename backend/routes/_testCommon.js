"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

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

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  u2Token,
  adminToken,
};
