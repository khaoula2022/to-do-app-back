const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const path = require("path");