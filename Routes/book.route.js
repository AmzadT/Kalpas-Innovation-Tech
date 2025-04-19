const express = require('express');
const bookRouter = express.Router();
const bookModel = require('../Models/book.model');

// GET all books
bookRouter.get('/', async (req, res) => {
  try {
    const books = await bookModel.find()
      .populate('library')
      .populate('author')
      .populate('borrower');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});


// GET book by ID
bookRouter.get('/:id', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id)
      .populate('library')
      .populate('author')
      .populate('borrower');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
});


// POST create a new book
bookRouter.post('/', async (req, res) => {
  try {
    const { title, genre, publishedYear, library, author, borrower } = req.body;
    const newBook = new bookModel({ title, genre, publishedYear, library, author, borrower });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Error creating book' });
  }
});


// PUT update a book
bookRouter.put('/:id', async (req, res) => {
  try {
    const { title, genre, publishedYear, library, author, borrower } = req.body;
    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      { title, genre, publishedYear, library, author, borrower },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
});


// DELETE book by ID
bookRouter.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

module.exports = bookRouter;
