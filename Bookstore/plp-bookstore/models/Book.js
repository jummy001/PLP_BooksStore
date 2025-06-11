const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    published_year: Number,
    price: Number,
    in_stock: Boolean,
    pages: Number,
    publisher: String
});

module.exports = mongoose.model('Book', bookSchema);