const mongoose = require('mongoose');

// Definir el esquema del cómic
const comicSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  contentUrls: [String],
  rating: {
    average: Number,
    totalVotes: Number
  },
  authors: [String],
  artists: [String],
  genres: [String],
  type: String,
  publicationYear: Number,
  status: String,
  editor: String
});

// Crear y exportar el modelo
const Comic = mongoose.model('Comic', comicSchema);
module.exports = Comic;
