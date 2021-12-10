const request = require("supertest");
const User = require("../models/userModel");
const app = require("../index");
//const supertest = require("supertest");

describe("test Endpoints", () => {
  test("The GET /tasks route should give status code 200", async () => {
    expect.assertions(1);
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
  });
});
