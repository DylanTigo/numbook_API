const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");
const { uploadUserImg } = require("../middlewares/uploadUserImg");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.put("/update/:id", uploadUserImg.single("profileImg"), validateToken, updateUser);

module.exports = router;
