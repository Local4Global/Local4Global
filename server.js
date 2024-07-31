require('dotenv').config(); // Asegúrate de que esto está al principio del archivo

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const setupSwagger = require('./config/swagger');
const config = require('config');
const killPort = require('kill-port');

const app = express();

// Conectar a la base de datos
connectDB();

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

const PORT = process.env.PORT || config.get('PORT');

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  }).on('error', async (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is already in use. Killing the process and restarting...`);
      await killPort(PORT);
      startServer(); // Try to start the server again
    } else {
      throw err;
    }
  });
};

// Intentar liberar el puerto y luego iniciar el servidor
killPort(PORT).then(() => {
  console.log(`Puerto ${PORT} liberado`);
  startServer();
}).catch(err => {
  console.error(`Error al liberar el puerto ${PORT}: ${err}`);
  startServer();
});
