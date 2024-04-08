const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/userProfiles",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const uploadContactImg = multer({ storage });

module.exports = { uploadContactImg };
