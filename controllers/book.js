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
  let bookToSave = Book.find({'book_id': req.body.book_id});

  if(!bookToSave) {
    bookObject.save((err, book) => {
      if(err) res.status(401).send({message: err.errmsg});
      res.status(200).json({book: book});
    });
  } else {
    console.log('book already saved!');
  }

}

module.exports = {
  getAll: getAll,
  newBook: newBook
}
