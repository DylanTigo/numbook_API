const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection')

connectDb()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, () => console.log(`Server is listening on ${port}`));
