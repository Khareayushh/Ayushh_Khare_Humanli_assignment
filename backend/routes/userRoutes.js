const express = require("express");
const { registerUser, login } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login)

module.exports = router;
