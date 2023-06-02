const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// another way to write it
router.route("/").get(protect, allUsers);

router.route("/register").post(registerUser);

router.post("/login", authUser);

module.exports = router;
