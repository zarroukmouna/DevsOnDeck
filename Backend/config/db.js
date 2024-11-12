const mongoose = require('mongoose');
const MONGO_URI=`mongodb+srv://mounazarroukk:xBTLRMnJdp6lglmw@devsondeck.yx4fv.mongodb.net/`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
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