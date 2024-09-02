const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
