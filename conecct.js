const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

// Conectar a MongoDB Atlas usando la variable de entorno MONGO_URI
mongoose.connect(process.env.MONGO_URI);

const objeto = mongoose.connection;

// Manejo de eventos
objeto.on('connected', () => {
  console.log('La base de datos de MongoDB ha sido conectada');
});

objeto.on('error', (err) => {
  console.error('Error en la conexión a la base de datos de MongoDB:', err.message);
});

module.exports = mongoose;
