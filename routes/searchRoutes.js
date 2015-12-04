'use strict';

const express     = require('express');
const router      = express.Router();
const book        = require('../controllers/searchController');

router.route('/:searchTerm')
  //search by terms
  .get(book.search)

router.route('/:searchTitle')
  //by title
  .get(book.searchByTitle);

router.route('/:searchAuthor')
  //by author
  .get(book.searchByAuthor);

module.exports = router;
