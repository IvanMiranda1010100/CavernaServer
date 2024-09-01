const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const emailRoutes = require('./mail'); 

const rutaComics = require('./routes/comicRouter');


const app = express();
const PORT = process.env.PORT || 8000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/comics', rutaComics);
app.use('/api', emailRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Cómics');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`El servidor se lanzó en el puerto ${PORT}`);
});
// Conectar a MongoDB Atlas usando la variable de entorno MONGO_URI
mongoose.connect(process.env.URL_CONNECT);

const objeto = mongoose.connection;

// Manejo de eventos
objeto.on('connected', () => {
  console.log('La base de datos de MongoDB ha sido conectada');
});

objeto.on('error', (err) => {
  console.error('Error en la conexión a la base de datos de MongoDB:', err.message);
});


