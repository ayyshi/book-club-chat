'use strict';

const express     = require('express');
const router      = express.Router();
const book        = require('../controllers/book');

router.route('/')
  // show all books
  .get(book.getAll)
  // add new book
  .post(book.newBook);

router.route('/:id')
  // remove book
  .delete(book.removeBook);

module.exports = router;
