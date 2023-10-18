"use strict";

const request = require("supertest");

const app = require("../app");
const SavedLocation = require("../models/savedLocation");

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

describe("GET /locations/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .get(`/locations/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.body).toEqual({
      locations: [
        {
          locationId: "test_id",
          name: "test_location",
          addressString: "test_address",
        },
      ],
    });
  });

  test("unauth for other users", async function () {
    const res = await request(app)
      .get(`/locations/${users.user2.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).get(`/users/0`);
    expect(res.statusCode).toEqual(401);
  });
});

/************************************** POST /locations/:userId */

describe("POST /locations/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .post(`/locations/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`)
      .send({
        locationId: "new",
        name: "new_location",
        addressString: "new_address",
      });

    expect(res.body).toEqual({
      location: {
        id: expect.any(Number),
        locationId: "new",
        name: "new_location",
        addressString: "new_address",
      },
    });
  });

  test("bad request with dup data", async function () {
    const res = await request(app)
      .post(`/locations/${users.user1.id}`)
      .send({
        locationId: "test_id",
        name: "test_location",
        addressString: "test_address",
      })
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.statusCode).toEqual(400);
  });
});

/************************************** DELETE /locations/:locationId/:userId */

describe("DELETE /locations/:locationId/:userId", function () {
  test("works for same user", async function () {
    const res = await request(app)
      .delete(`/locations/test_id/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u1Token}`);

    expect(res.body).toEqual({
      deleted: `Location test_id for User ${users.user1.id}`,
    });
  });

  test("unauth if not same user", async function () {
    const res = await request(app)
      .delete(`/locations/test_id/${users.user1.id}`)
      .set("authorization", `Bearer ${userTokens.u2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const res = await request(app).delete(
      `/locations/test_id/${users.user1.id}`
    );
    expect(res.statusCode).toEqual(401);
  });
});
