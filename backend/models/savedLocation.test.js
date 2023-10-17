"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const SavedLocation = require("./savedLocation.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// /************************************** add */

describe("add", function () {
  const newLocation = {
    locationId: "123",
    name: "location",
    addressString: "address",
  };

  test("works", async function () {
    const res = await db.query(`SELECT * FROM users WHERE username = 'u1'`);
    const user = res.rows[0];
    let location = await SavedLocation.add({
      ...newLocation,
      userId: user.id,
    });
    expect(location).toEqual({
      ...newLocation,
      id: expect.any(Number),
    });
    const found = await db.query(
      "SELECT * FROM saved_locations WHERE location_id = '123'"
    );
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].user_id).toEqual(user.id);
  });

  test("bad request with dup data", async function () {
    const res = await db.query(`SELECT * FROM users WHERE username = 'u2'`);
    const user = res.rows[0];
    try {
      await SavedLocation.add({
        ...newLocation,
        userId: user.id,
      });
      await SavedLocation.add({
        ...newLocation,
        userId: user.id,
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** get */

describe("get", function () {
  test("works", async function () {
    const res = await db.query(`SELECT * FROM users WHERE username = 'u2'`);
    const user = res.rows[0];
    let locations = await SavedLocation.getAll(user.id);
    expect(locations[0]).toEqual({
      locationId: "test_id",
      name: "test_location",
      addressString: "test_address",
    });
  });

  test("returns empty array if none found", async function () {
    const res = await db.query(`SELECT * FROM users WHERE username = 'u1'`);
    const user = res.rows[0];
    let locations = await SavedLocation.getAll(user.id);
    expect(locations).toEqual([]);
  });
});

// /************************************** remove */

describe("remove", function () {
  test("works", async function () {
    const res = await db.query(`SELECT * FROM users WHERE username = 'u2'`);
    const user = res.rows[0];
    let locations = await SavedLocation.remove(user.id, "test_id");
    expect(locations).toEqual(undefined);
    const found = await db.query(
      `SELECT * FROM saved_locations WHERE user_id=${user.id}`
    );
    expect(found.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await SavedLocation.remove(0, 0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
