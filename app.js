const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection')
const cors = require('cors')

connectDb()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// app.get("/", (req, res) => res.send("Bonjour"))
app.use(errorHandler)

app.listen(port, () => console.log(`Server is listening on ${port}`));
