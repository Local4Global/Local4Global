const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Local4Global API',
      version: '1.0.0',
      description: 'API documentation for Local4Global'
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

console.log('Swagger Options:', JSON.stringify(swaggerOptions, null, 2));

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

module.exports.swaggerSpecs = swaggerSpecs;


