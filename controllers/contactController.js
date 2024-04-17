const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
//@desc GET all contact
//@access private
const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({ userId: req.user.id });
  res.status(200).json(contacts);
};

//desc POST add contact
//access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !phone) {
    res.status(400);
    throw new Error("Please provide name, email and phone number");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    contactProfilPath: null,
    userId: req.user.id,
  });
  res.status(200).json(contact);
});

//desc GET a contact
//access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Your're not authorized to perform this action");
  }

  res.status(200).json(contact);
});

//desc PUT a contact
//access private
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please provide name, email and phone number");
  }

  if (contact.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Your're not authorized to perform this action");
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error();
  }

  const contactUpdate = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(contactUpdate);
});

//desc DELETE a contact
//access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not found");
  }

  if (contact.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Your're not authorized to perform this action");
  }

  await Contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  deleteContact,
  updateContact,
  getAllContacts,
  getContact,
  createContact,
};
