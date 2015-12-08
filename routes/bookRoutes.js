'use strict';

const express     = require('express');
const router      = express.Router();
const book        = require('../controllers/book');

router.route('/')
  .get(book.getAll)
  .post(book.newBook);

module.exports = router;
