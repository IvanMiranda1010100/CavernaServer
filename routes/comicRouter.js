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

module.exports = router;
