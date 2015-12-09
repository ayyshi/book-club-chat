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
  let bookObject = new Book(req.body);
  // check if the book to be saved is already in the database
  let bookToSave = Book.find({'book_id': req.body.book_id});

  // if book to be saved is not in the database
  if(req.body != bookToSave) {
    bookObject.save((err, book) => {
      if(err) res.status(401).send({message: err.errmsg});
      res.status(200).json({book: book});
    });
  } else {
    console.log('book already saved!');
  }

}

function removeBook(req, res){
  let id = req.params.id;

  Book.remove({_id: id}, function(err){
    if(err) res.json({message: 'cannot delete: ' + err});
    res.json({message: 'book deleted!'});
  })
}

module.exports = {
  getAll: getAll,
  newBook: newBook,
  removeBook: removeBook
}
