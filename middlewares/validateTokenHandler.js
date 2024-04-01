const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEM, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("The user is not autorize");
      }
      req.user = decoded;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("The user is not authorize or not Token provide");
    }
  }
});

module.exports = validateToken;
