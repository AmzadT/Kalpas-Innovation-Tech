const express = require('express');
const libraryInventoryRouter = express.Router();
const bookModel = require('../Models/book.model');
const libraryModel = require('../Models/library.model');
const authMiddleware = require('../Middlewares/authMiddleware');
const roleMiddleware = require('../Middlewares/roleMiddleware');
const {getMessage} = require('../Utils/messages');

// GET /api/libraries/:id/inventory
libraryInventoryRouter.get('/:id/inventory', authMiddleware, async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';

  try {
    const library = await libraryModel.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: getMessage('library_not_found', lang) });
    }

    const books = await bookModel.find({ library: req.params.id });
    res.json({ message: getMessage('inventory_list', lang), books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/libraries/:id/inventory
libraryInventoryRouter.post('/:id/inventory', authMiddleware, roleMiddleware(['admin', 'librarian']), async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';

  try {
    const library = await libraryModel.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: getMessage('library_not_found', lang) });
    }

    const { title, genre, publishedYear, image, author } = req.body;

    const book = new bookModel({
      title,
      genre,
      publishedYear,
      image, 
      author,
      library: req.params.id
    });

    await book.save();
    res.status(201).json({ message: getMessage('book_added', lang), book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/libraries/:id/inventory/:bookId
libraryInventoryRouter.delete('/:id/inventory/:bookId', authMiddleware, roleMiddleware(['admin', 'librarian']), async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';

  try {
    const book = await bookModel.findOneAndDelete({
      _id: req.params.bookId,
      library: req.params.id
    });

    if (!book) {
      return res.status(404).json({ message: getMessage('book_not_found', lang) });
    }

    res.json({ message: getMessage('book_removed', lang) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = libraryInventoryRouter;
