const mongoose = require('mongoose');
const config = require('config');

const env = process.env.NODE_ENV;
console.log(`Current environment: ${env}`);
const db = env === 'production' ? config.get('MONGO_URI_PROD') : config.get('MONGO_URI_DEV');
console.log(`Database URI: ${db}`);

// Configurar la advertencia de Mongoose sobre strictQuery
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) { // Verificar si ya hay una conexión establecida
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB connected to ${env === 'production' ? 'production' : 'development'} database`);
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;











