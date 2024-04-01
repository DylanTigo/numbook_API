const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  name: { type: String, required: [true, "Please enter a name"] },
  email: { type: String, required: [true, "Please enter a email"] },
  phone: { type: Number, required: [true, "Please enter a number"] },
}, {
  timestamps:  true 
});

module.exports = mongoose.model("Contact", contactSchema);