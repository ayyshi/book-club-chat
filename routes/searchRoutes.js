'use strict';

const express     = require('express');
const router      = express.Router();
const search      = require('../controllers/search');

router.route('/term/:searchTerm')
  //search by terms
  .get(search.searchByTerm);

router.route('/title/:searchTitle')
  //by title
  .get(search.searchByTitle);

router.route('/author/:searchAuthor')
  //by author
  .get(search.searchByAuthor);

module.exports = router;
