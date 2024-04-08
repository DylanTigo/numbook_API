const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "Please enter a name"] },
    surname: { type: String },
    email: { type: String },
    phone: { type: Number, required: [true, "Please enter a number"] },
    contactProfilPath: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
