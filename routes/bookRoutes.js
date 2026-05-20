const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch books', error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		res.status(200).json(book);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch book', error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ message: 'Failed to create book', error: error.message });
	}
});

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