'use strict';

// const User = require('../models/book');
const request     = require('request');
const bodyParser  = require('body-parser');

// must set as env variable when deployed
const apiKey = "AIzaSyDDexcrnyNKULi_MgUvQ6-TqsHPRJBHHS8";

// MUST REFRACTOR SEARCH FUNCTION TO APPLY FOR BY TITLE AND BY AUTHOR
function search(req, res){
  // let searchURL = "https://www.googleapis.com/books/v1/volumes?q=" + req.params.searchTerm + "&key=" + apiKey;
  let searchURL = "https://www.googleapis.com/books/v1/volumes?q=outlander&key=" + apiKey;
  request(searchURL, (err, response, body) => {
    let results = JSON.parse(body).items;

    res.json(results);
  });
}

// function searchByTitle(req, res){
//   let searchURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + req.params.searchTitle + "&key=" + apiKey;
//
//   request(searchURL, (err, response, body) => {
//     let results = JSON.parse(body);
//     let items = results['items'];
//
//     let book = [];
//
//     // iterate over all books to find id, author and title
//     for (let i=0; i < items.length; i++){
//       book.push([items[i]['id'], items[i]['volumeInfo']['title'], items[i]['volumeInfo']['authors'], items[i]['volumeInfo']['imageLinks']['smallThumbnail']]);
//     };
//
//     res.send(book);
//   });
// }
//
// function searchByAuthor(req, res){
//   let searchURL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + req.params.searchAuthor + "&key=" + apiKey;
//
//   request(searchURL, (err, response, body) => {
//     let results = JSON.parse(body);
//     let items = results['items'];
//
//     let book = [];
//
//     // iterate over all books to find id, author and title
//     for (let i=0; i < items.length; i++){
//       book.push([items[i]['id'], items[i]['volumeInfo']['title'], items[i]['volumeInfo']['authors'], , items[i]['volumeInfo']['imageLinks']['smallThumbnail']]);
//     };
//
//     res.send(book);
//   });
// }

module.exports = {
  search: search
  // searchByTitle: searchByTitle,
  // searchByAuthor: searchByAuthor
}
