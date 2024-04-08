const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please  provide a Username."],
    },
    email: {
      type: String,
      required: [true, "Please provide an Email address."],
      unique: [true, "This email adress is already tokken"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    userProfilPath: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
