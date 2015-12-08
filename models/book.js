'use strict';

const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
  // unique book_id to prevent the same book being saved to the database twice
  book_id: { type: String, unique: true },
  title:   { type: String },
  authors:  { type: String },
  img_url: { type: String }
});

let Book = mongoose.model('Book', BookSchema);

module.exports = Book;
