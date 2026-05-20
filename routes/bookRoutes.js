const express = require('express');
const Book = require('../models/book');

const router = express.Router();

// Get the full bookshelf.
router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch books', error: error.message });
	}
});

// Grab one book by its id.
router.get('/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			// Keep the response clear when nothing matches that id.
			return res.status(404).json({ message: 'Book not found' });
		}

		res.status(200).json(book);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch book', error: error.message });
	}
});

// Add a new book from the request body.
router.post('/', async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ message: 'Failed to create book', error: error.message });
	}
});

// Update whichever fields come in for a specific book.
router.put('/:id', async (req, res) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedBook) {
			return res.status(404).json({ message: 'Book not found' });
		}

		res.status(200).json(updatedBook);
	} catch (error) {
		res.status(400).json({ message: 'Failed to update book', error: error.message });
	}
});

// Remove a book permanently by id.
router.delete('/:id', async (req, res) => {
	try {
		const deletedBook = await Book.findByIdAndDelete(req.params.id);
		if (!deletedBook) {
			return res.status(404).json({ message: 'Book not found' });
		}

		res.status(200).json({ message: 'Book deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete book', error: error.message });
	}
});

module.exports = router;