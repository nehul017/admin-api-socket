const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { registerSchema, loginSchema } = require("../middleware/joiValidation");

router.post("/register", registerSchema, userController.register);
router.post("/login", loginSchema, userController.login);

exports.router = router;
