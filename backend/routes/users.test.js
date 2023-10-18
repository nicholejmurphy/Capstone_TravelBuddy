"use strict";

const request = require("supertest");

const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  users,
  userTokens,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users/:userId*/

describe("GET /users/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .get(`/users/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.body).toEqual({
      user: {
        id: users.user1.id,
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
      },
    });
  });

  test("unauth for other users", async function () {
    const res = await request(app)
      .get(`/users/${users.user2.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).get(`/users/0`);
    expect(res.statusCode).toEqual(401);
  });
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:userId", () => {
  test("works for same user", async function () {
    const res = await request(app)
      .patch(`/users/${users.user1.id}`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${userTokens.u1Token}`);
    expect(res.body).toEqual({
      user: {
        id: users.user1.id,
        username: "u1",
        firstName: "New",
        lastName: "U1L",
      },
    });
  });

  test("unauth if not same user", async function () {
    const res = await request(app)
      .patch(`/users/${users.user1.id}`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${userTokens.u2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).patch(`/users/${users.user1.id}`).send({
      firstName: "New",
    });
    expect(res.statusCode).toEqual(401);
  });

  test("bad request if invalid data", async function () {
    const res = await request(app)
      .patch(`/users/${users.user1.id}`)
      .send({
        firstName: 42,
      })
      .set("authorization", `Bearer ${userTokens.u1Token}`);
    expect(res.statusCode).toEqual(400);
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .delete(`/users/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);
    expect(res.body).toEqual({ deleted: `${users.user1.id}` });
  });

  test("unauth if not same user", async function () {
    const res = await request(app)
      .delete(`/users/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).delete(`/users/${users.user1.id}`);
    expect(res.statusCode).toEqual(401);
  });
});
