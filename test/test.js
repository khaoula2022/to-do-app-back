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
  /***********************creation of a new task  */
  it("should create a new task", async () => {
    const res = await request(app).post("/tasks").send({
      label: "this is a test task",
      description: "this is a test task description",
    });
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty("post");
  });

  //******************************************delete test *******************************

  it("should delete a task", async () => {
    const res = await request(app).delete("/tasks/61b393dd2483d9ac6046de7b");
    expect(res.statusCode).toEqual(204);
  });
});
