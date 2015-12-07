'use strict';

const express     = require('express');
const router      = express.Router();
const book        = require('../controllers/search');

router.route('/term/:searchTerm')
  //search by terms
  .get(book.searchByTerm)

router.route('/title/:searchTitle')
  //by title
  .get(book.searchByTitle);

router.route('/author/:searchAuthor')
  //by author
  .get(book.searchByAuthor);

module.exports = router;
