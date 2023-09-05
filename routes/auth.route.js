const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.control");
const {
  newUserValidation,
  newUserValidationLogin,
} = require("../middleware/userValidation.middleware");

router.post("/login");
router.post("/signup", newUserValidation, authController.newUser);

module.exports = router;
