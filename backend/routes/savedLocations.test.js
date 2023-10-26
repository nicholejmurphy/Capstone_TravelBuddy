"use strict";

const request = require("supertest");

const app = require("../app");
// const SavedLocation = require("../models/savedLocation");

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

/************************************** GET /locations/:userId*/

describe("GET /savedLocations/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .get(`/savedLocations/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.body).toEqual({
      locationIds: [
        {
          id: "test_id",
        },
      ],
    });
  });

  test("unauth for other users", async function () {
    const res = await request(app)
      .get(`/savedLocations/${users.user2.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).get(`/users/0`);
    expect(res.statusCode).toEqual(401);
  });
});

/************************************** POST /locations/:userId */

describe("POST /savedLocations/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .post(`/savedLocations/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`)
      .send({
        locationId: "new",
      });

    expect(res.body).toEqual({
      locationId: {
        id: "new",
      },
    });
  });

  test("bad request with dup data", async function () {
    const res = await request(app)
      .post(`/savedLocations/${users.user1.id}`)
      .send({
        locationId: "test_id",
      })
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.statusCode).toEqual(400);
  });
});

/************************************** DELETE /locations/:locationId/:userId */

describe("DELETE /savedLocations/:locationId/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .delete(`/savedLocations/test_id/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.body).toEqual({
      deleted: `Location test_id for User ${users.user1.id}`,
    });
  });

  test("unauth if not same user", async function () {
    const res = await request(app)
      .delete(`/savedLocations/test_id/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).delete(
      `/savedLocations/test_id/${users.user1.id}`
    );
    expect(res.statusCode).toEqual(401);
  });
});
