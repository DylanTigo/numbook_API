const express = require("express");

const {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getContact,
} = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();
const { uploadContactImg } = require('../middlewares/uploadContactImg')

router.use(validateToken)
router.route("/").get(getAllContacts).post(uploadContactImg.single('image') ,createContact);
router.route("/:id").get(getContact).put(uploadContactImg.single('image') ,updateContact).delete(deleteContact);

module.exports = router;
