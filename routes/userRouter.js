var express = require("express");
var router = express.Router();
const auth = require("../middleware/authMiddleware");

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
//router.post("/login", userController.login);
router.post("/login", userController.login);

module.exports = router;
