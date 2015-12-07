'use strict';

const express     = require('express');
const router      = express.Router();
const book        = require('../controllers/book');

router.route('/')
  // .get(book.getAll)
  .post(book.newBook);

// router.route('/:id')
//   .put(book.getBook)
//   .delete(book.removeBook);

module.exports = router;
