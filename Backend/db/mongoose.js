const mongoose = require('mongoose');
const config = require('../config/config'); 
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;