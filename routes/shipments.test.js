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
  test ("throws error if missing all properties (Empty JSON)", async function() {
    const resp = await request(app)
      .post("/shipments")
      .send({}
      );
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
			"instance requires property \"productId\"",
			"instance requires property \"name\"",
			"instance requires property \"addr\"",
			"instance requires property \"zip\""
		]);
  });

  test ("throws error if missing some properties", async function(){
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          name: "Test Tester"
        }
      );
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
			"instance requires property \"productId\"",
			"instance requires property \"addr\"",
			"instance requires property \"zip\""
		]);
  });

  test("throws error if multiple invalid properties", async function() {
    const resp = await request(app)
      .post("/shipments")
      .send(
        {
          productId: "1AA",
          name: 123,
          addr: 1234,
          zip: 12345
        }
      );
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
			"instance.productId is not of a type(s) integer",
			"instance.name is not of a type(s) string",
			"instance.addr is not of a type(s) string",
			"instance.zip is not of a type(s) string"
		]);
  })

});
