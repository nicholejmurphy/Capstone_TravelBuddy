"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
} = require("./auth");

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test", id: 4 }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", id: 4 }, "wrong");

describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);

    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        id: expect.any(Number),
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works: invalid token", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe("ensureLoggedIn", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", id: 4 } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

describe("ensureCorrectUser", function () {
  test("works: same user", function () {
    expect.assertions(1);
    const req = { params: { userId: 4 } };
    const res = { locals: { user: { username: "test", id: 4 } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureCorrectUser(req, res, next);
  });

  test("unauth: mismatch", function () {
    expect.assertions(1);
    const req = { params: { userId: 4 } };
    const res = { locals: { user: { username: "test", id: 2 } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUser(req, res, next);
  });

  test("unauth: if anon", function () {
    expect.assertions(1);
    const req = { params: { userId: 4 } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUser(req, res, next);
  });
});
