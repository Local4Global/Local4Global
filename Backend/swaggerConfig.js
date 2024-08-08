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
  apis: ['./routes/*.js'] // Usar una ruta relativa básica
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

console.log('Swagger Options:', JSON.stringify(swaggerOptions, null, 2));

module.exports = swaggerSpecs;
