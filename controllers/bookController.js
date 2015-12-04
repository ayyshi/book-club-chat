'use strict';

const User = require('../models/book');
const request     = require('request');
const bodyParser  = require('body-parser');

// must set as env variable when deployed
const key = "";

function search(req, res){
  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=" + req.params.searchTerm + "&key=" + apiKey;

  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body);
    let items = results['items'];

    let book = [];

    // iterate over all books to find id, author and title
    for (let i=0; i < items.length; i++){
      book.push([items[i]['id'], items[i]['volumeInfo']['title'], items[i]['volumeInfo']['authors']]);
    };

    res.send(book);
  });
}

function searchByTitle(req, res){
  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + req.params.searchTitle + "&key=" + apiKey;

  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body);
    let items = results['items'];

    let book = [];

    // iterate over all books to find id, author and title
    for (let i=0; i < items.length; i++){
      book.push([items[i]['id'], items[i]['volumeInfo']['title'], items[i]['volumeInfo']['authors']]);
    };

    res.send(book);
  });
}

function searchByAuthor(req, res){
  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + req.params.searchAuthor + "&key=" + apiKey;

  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body);
    let items = results['items'];

    let book = [];

    // iterate over all books to find id, author and title
    for (let i=0; i < items.length; i++){
      book.push([items[i]['id'], items[i]['volumeInfo']['title'], items[i]['volumeInfo']['authors']]);
    };

    res.send(book);
  });
}

module.exports = {
  search: search,
  searchByTitle: searchByTitle,
  searchByAuthor: searchByAuthor
}
