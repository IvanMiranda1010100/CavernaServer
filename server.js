const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const emailRoutes = require('./mail'); // Ruta para el envío de correos electrónicos
dotenv.config();

const mongoose = require('./conecct'); // Conexión a MongoDB
const rutaComics = require('./routes/comicRouter'); // Rutas de los cómics

const app = express();
const PORT = process.env.PORT || 5000;

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
