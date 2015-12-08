'use strict';

const request     = require('request');
const bodyParser  = require('body-parser');
const Book        = require('../models/book');

function getAll(req, res){
  Book.find((err, books) => {
    res.send(books);
  })
}

function newBook(req, res){
  console.log(req.body);

  let bookObject = new Book(req.body);

  bookObject.save((err, book) => {
    if(err) res.status(401).send({message: err.errmsg});
      res.status(200).json({book: book});
  });
}

module.exports = {
  getAll: getAll,
  newBook: newBook
}
