"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
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

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      id: expect.any(Number),
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      locationId: "60742",
      locationName: "Asheville, NC",
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual({ ...newUser, id: expect.any(Number) });
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    const user1 = await db.query(`SELECT id FROM users WHERE username = 'u1'`);
    const user1Id = user1.rows[0].id;

    let user = await User.get(user1Id);
    expect(user).toEqual({
      id: user1Id,
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      locationId: "60742",
      locationName: "Asheville, NC",
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    firstName: "NewF",
    lastName: "NewL",
  };

  test("works", async function () {
    const user1 = await db.query(`SELECT id FROM users WHERE username = 'u1'`);
    const user1Id = user1.rows[0].id;

    let user = await User.update(user1Id, updateData);
    expect(user).toEqual({
      id: user1Id,
      username: "u1",
      locationId: "60742",
      locationName: "Asheville, NC",
      ...updateData,
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.update(0, {
        firstName: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request if no data", async function () {
    expect.assertions(1);
    try {
      await User.update("c1", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    const user1 = await db.query(`SELECT id FROM users WHERE username = 'u1'`);
    const user1Id = user1.rows[0].id;

    await User.remove(user1Id);
    const res = await db.query(`SELECT * FROM users WHERE id=${user1Id}`);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
