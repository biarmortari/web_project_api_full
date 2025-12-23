const express = require("express");
const router = express.Router();
const {
  validateSignup,
  validateSignin,
} = require("../middleware/validation.middleware");
const { createUser, login } = require("../controllers/users.controller");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

module.exports = router;
