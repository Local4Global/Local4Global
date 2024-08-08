const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minimal API',
      version: '1.0.0',
      description: 'A minimal API documentation example'
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server'
      }
    ]
  },
  apis: [path.join(__dirname, 'routes', '*.js')]
};

console.log('Swagger Options:', JSON.stringify(swaggerOptions, null, 2));

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpecs;

