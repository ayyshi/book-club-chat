'use strict';

// const User = require('../models/book');
const request     = require('request');
const bodyParser  = require('body-parser');

// must set as env variable when deployed
const apiKey = "";

function searchByTerm(req, res){

  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=" + req.params.searchTerm + "&key=" + apiKey;
  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body).items;

    res.send(results);
  });
}

function searchByTitle(req, res){

  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + req.params.searchTitle + "&key=" + apiKey;
  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body).items;

    res.send(results);
  });
}

function searchByAuthor(req, res){

  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + req.params.searchAuthor + "&key=" + apiKey;
  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body).items;

    res.send(results);
  });
}

module.exports = {
  searchByTerm: searchByTerm,
  searchByTitle: searchByTitle,
  searchByAuthor: searchByAuthor
}
