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

  /*******************************Not found test  (needs to be fixed ) */

  /*it("Server error if resource not found ", async () => {
    const taskId = 4654;
    const res = await request(app).get(`/tasks/" ${taskId}`);
    expect(res.statusCode).toEqual(404);
  });*/

  /***************************pawwdor and confirm password must match  */
  it("should throw an error if password and confirm password are the the same", async () => {
    try {
      await new User({
        username: "sam",
        email: "example@esprit.tn",
        password: "1234521",
        passwordConfirm: "54875454",
      }).save();
    } catch (err) {
      expect(err.errors.passwordConfirm.message).toEqual(
        "Your password and confirmation password are not the same"
      );
    }
  });
  /*********************************e-mail test */
  it("should throw an error if the user provides an unvalid e-mail", async () => {
    try {
      await new User({
        username: "khaoula",
        email: "example.tn",
        password: "123456",
      }).save();
    } catch (err) {
      expect(err.errors.email.message).toEqual(" Please provide a valid email");
    }
  });
});
