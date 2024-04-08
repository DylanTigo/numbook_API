const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//desc POST user
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Enter  all fields");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("This  Email is already registered!");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    userProfilPath: null
  });

  if (user) {
    res.status(201).json({ _id: user._id, username: user.username });
  } else {
    res.status(400);
    throw new Error("User data not valid!");
  }
  res.status(200).json({ message: "Register the user" });
});

//desc POST login user
//access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user.id,
      },
      process.env.SECRET_ACCESS_TOKEM,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//desc GET user
//access private
const currentUser = asyncHandler(async (res, req) => {
  res.json({ message: "Current user informations" });
});

//desc PUT user
//access private
const updateUser = asyncHandler(async (req, res) => {
  let userProfilPath;
  if (req.file) {
    userProfilPath = "/uploads/userProfiles/" + req.file.filename;
  }
  let user = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body, userProfilPath },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    res.status(401);
    throw new Error("No user found with this ID!");
  }
  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, currentUser, updateUser };
