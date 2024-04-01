const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTIO_STRING);
    console.log('Connection à la base de données reussi',  connect.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
};

module.exports = connectDb
