const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
//const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 4000;
const authMiddleware = require("./middleware/authMiddleware");
var bodyParser = require("body-parser");

//const db = process.env.DATABASE;

/**
 * configure routers
 */
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");

const CONNECTION_URL =
  "mongodb+srv://internship:internship@cluster0.hqnas.mongodb.net/internshipDatabase?retryWrites=true&w=majority";

/**
 * configure express app here
 */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
/**
 * use routers here
 */

/////mongoose

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
app.use("/tasks", taskRouter);
app.use("/user", userRouter);
app.use(authMiddleware.protect);

module.exports = app;
