"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if productId is invalid", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          name: "Test Tester",
          addr: "100 Test St",
          zip: "12345-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });

  //add expect for error message
  //don't need as many tests for testing json schema requirements
  //combine tests into one, all three missing, all three wrong types
  test("throws error if no productId", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          name: "Test Tester",
          addr: "100 Test St",
          zip: "12345-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if name is invalid", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          name: 543,
          addr: "100 Test St",
          zip: "12345-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if no name", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          addr: "100 Test St",
          zip: "12345-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
    //add expect for error message
  });

  test("throws error if addr is invalid", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          name: "Test Tester",
          addr: 8765,
          zip: "12345-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if no addr", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          name: "Test Tester",
          zip: "12345-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if invalid zip", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          name: "Test Tester",
          addr: "100 Test St",
          zip: "1a5-6789",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if no zip", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1000",
          name: "Test Tester",
          addr: "100 Test St",
        }
      );
    expect(resp.statusCode).toEqual(400);
  });


});
