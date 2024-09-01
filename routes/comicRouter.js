const express = require('express');
const router = express.Router();
const Comic = require('../models/comic');

router.get('/', async (req, res) => {
  try {
    const comics = await Comic.find().lean();
    res.json(comics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id/:title', async (req, res) => {
  try {
    const { id, title } = req.params;
    const decodedTitle = decodeURIComponent(title); // Decodifica el título
    const comic = await Comic.findOne({ _id: id, title: decodedTitle }).lean(); // Busca el cómic por ID y título
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.json(comic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id).lean(); // Busca el cómic por ID
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.json(comic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    contentUrls,
    rating,
    authors,
    artists,
    genres,
    type,
    publicationYear,
    status,
    editor
  } = req.body;

  // Validar datos
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const newComic = new Comic({
      title,
      description,
      imageUrl,
      contentUrls,
      rating,
      authors,
      artists,
      genres,
      type,
      publicationYear,
      status,
      editor
    });

    // Guardar el cómic en la base de datos
    const savedComic = await newComic.save();
    res.status(201).json(savedComic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
