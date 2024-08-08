const express = require('express');
const cors = require('cors');
const setupSwagger = require('./config/swagger');
const config = require('config');
const killPort = require('kill-port');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const app = express();

// Cargar las variables de entorno según el entorno
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const PORT = process.env.PORT || config.get('PORT') || 5001;

console.log('NODE_ENV:', process.env.NODE_ENV || 'not set'); // Verifica NODE_ENV

app.use(cors());
app.use(express.json({ extended: false }));

// Configurar Swagger
setupSwagger(app);

// Ruta base
app.get('/', (req, res) => {
  res.send('API is running');
});

// Definir rutas
app.use('/api/agencies', require('./routes/agencies'));
app.use('/api/donors', require('./routes/donors'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/progress-reports', require('./routes/progressReports'));
app.use('/api/auth', require('./routes/auth'));

let server;

const startServer = async () => {
  try {
    if (server) {
      server.close(async () => {
        await killPort(PORT);
        console.log(`Puerto ${PORT} liberado`);
        server = app.listen(PORT, () => {
          console.log(`Server restarted on port ${PORT}`);
        });
      });
    } else {
      server = app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    }

    server.on('error', async (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Killing the process and restarting...`);
        await killPort(PORT);
        console.log(`Port ${PORT} has been freed.`);
        setTimeout(startServer, 1000); // Retraso de 1 segundo antes de intentar reiniciar el servidor
      } else {
        console.error('Server error:', err);
        process.exit(1); // Exit the process with failure
      }
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1); // Exit the process with failure
  }
};

const runApp = async () => {
  try {
    await connectDB();
    startServer();
  } catch (err) {
    console.error('Error during startup:', err);
    process.exit(1);
  }
};

runApp();










