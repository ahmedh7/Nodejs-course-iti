const mongoose = require("mongoose");
require("dotenv").config();

const initDB = async (callback) => {
  await mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

exports.initDB = initDB;
