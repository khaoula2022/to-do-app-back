const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 4000;

const CONNECTION_URL =
  "mongodb+srv://internship:internship@cluster0.hqnas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/**
 * configure express app here
 */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
