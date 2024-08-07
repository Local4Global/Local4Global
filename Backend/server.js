const express = require('express');
const cors = require('cors');
const setupSwagger = require('./config/swagger');
const config = require('config');
const killPort = require('kill-port');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const app = express();

// Cargar las variables de entorno según el entorno
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

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
app.use('/api/auth', require('./routes/auth')); // Asegúrate de tener esta línea

let server;

const startServer = async () => {
  if (server) {
    console.log('Server is already running. Skipping restart.');
    return;
  }

  try {
    server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    server.on('error', async (err) => {
      console.error('Server encountered an error:', err);
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Killing the process and restarting...`);
        try {
          await killPort(PORT);
          console.log(`Port ${PORT} has been freed.`);
          server = null; // Ensure server instance is reset
          setTimeout(startServer, 1000); // Retraso de 1 segundo antes de intentar reiniciar el servidor
        } catch (killErr) {
          console.error(`Error killing the port ${PORT}:`, killErr);
          process.exit(1); // Exit the process with failure
        }
      } else {
        console.error('Server error:', err);
        process.exit(1); // Exit the process with failure
      }
    });

    server.on('close', () => {
      console.log('Server closed unexpectedly.');
      server = null; // Reset server instance
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1); // Exit the process with failure
  }
};

const runApp = async () => {
  try {
    await killPort(PORT); // Asegurarse de que el puerto esté libre antes de iniciar
    console.log(`Puerto ${PORT} liberado`);
    await connectDB();
    startServer();
  } catch (err) {
    console.error('Error during startup:', err);
    process.exit(1);
  }
};

runApp();







