const express = require('express');
const libraryRouter = express.Router();
const bookModel = require('../Models/book.model');
const libraryModel = require('../Models/library.model');

// GET all libraries
libraryRouter.get('/', async (req, res) => {
  try {
    const libraries = await libraryModel.find();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching libraries' });
  }
});

// GET a library by ID (including books and borrowers)
libraryRouter.get('/:id', async (req, res) => {
  try {
    const library = await libraryModel.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    const books = await bookModel.find({ library: library._id })
      .populate('borrower'); 

    res.json({ library, books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching library details' });
  }
});

// POST create a new library
libraryRouter.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;
    const newLibrary = new libraryModel({ name, location });
    await newLibrary.save();
    res.status(201).json(newLibrary);
  } catch (error) {
    res.status(400).json({ error: 'Error creating library' });
  }
});

// PUT update a library
libraryRouter.put('/:id', async (req, res) => {
  try {
    const { name, location } = req.body;
    const updatedLibrary = await libraryModel.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true }
    );
    if (!updatedLibrary) {
      return res.status(404).json({ message: 'Library not found' });
    }
    res.json(updatedLibrary);
  } catch (error) {
    res.status(400).json({ error: 'Error updating library' });
  }
});

// DELETE a library
libraryRouter.delete('/:id', async (req, res) => {
  try {
    const deletedLibrary = await libraryModel.findByIdAndDelete(req.params.id);
    if (!deletedLibrary) {
      return res.status(404).json({ message: 'Library not found' });
    }
    res.json({ message: 'Library deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting library' });
  }
});

module.exports = libraryRouter;
