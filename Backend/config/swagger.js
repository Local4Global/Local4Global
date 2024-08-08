const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Local4Global API',
      version: '1.0.0',
      description: 'API documentation for Local4Global',
    },
  },
  apis: ['./routes/*.js'], // Rutas donde están tus archivos de rutas
};

const specs = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;

