'use strict';

const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
  book_id: { type: Number },
  title:   { type: String },
  author:  { type: String },
  img_url: { type: String }
});

let Book = mongoose.model('Book', BookSchema);

module.exports = Book;
