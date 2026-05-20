const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    publishDate: Date,
    inStock: Boolean
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
