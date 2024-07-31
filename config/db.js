const mongoose = require('mongoose');
const config = require('config');
const db = process.env.NODE_ENV === 'Develop' ? config.get('MONGO_URI_PROD') : config.get('MONGO_URI_DEV');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;






