const express = require('express');
const borrowRouter = express.Router();
const borrowModel = require('../Models/borrow.model');
const bookModel = require('../Models/book.model');

// POST /api/borrow – Borrow a book
borrowRouter.post('/', async (req, res) => {
  try {
    const { book, borrower, charge } = req.body;

    const existingBorrow = await borrowModel.findOne({ book, returned: false });
    if (existingBorrow) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    const borrowRecord = new borrowModel({ book, borrower, charge });
    await borrowRecord.save();

    // Update book's borrower field
    await bookModel.findByIdAndUpdate(book, { borrower });

    res.status(201).json({ message: 'Book borrowed successfully', borrowRecord });
  } catch (error) {
    res.status(500).json({ error: 'Error borrowing book' });
  }
});

// PUT /api/return/:id – Return a borrowed book
borrowRouter.put('/return/:id', async (req, res) => {
  try {
    const borrowRecord = await borrowModel.findById(req.params.id);
    if (!borrowRecord) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }
    if (borrowRecord.returned) {
      return res.status(400).json({ message: 'Book is already returned' });
    }

    borrowRecord.returned = true;
    borrowRecord.returnDate = new Date();
    await borrowRecord.save();

    // Clear borrower from book
    await bookModel.findByIdAndUpdate(borrowRecord.book, { borrower: null });

    res.json({ message: 'Book returned successfully', borrowRecord });
  } catch (error) {
    res.status(500).json({ error: 'Error returning book' });
  }
});

module.exports = borrowRouter;
