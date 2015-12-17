'use strict';

angular.module('TheBookApp', [])
  .controller('SearchController', SearchController)
  .controller('BookController', BookController);

SearchController.$inject = ['$http'];
BookController.$inject = ['$http'];

function SearchController($http) {
  let self = this;

  self.all = [];
  self.getSearch = getSearch;
  self.getTitleSearch = getTitleSearch;
  self.getAuthorSearch = getAuthorSearch;

  function getSearch(){
    $http
      .get('https://bookclubchat.herokuapp.com/search/term/' + self.searchTerm)
      .then(function(response){
        self.all = response.data;
      });
  };

  function getTitleSearch(){
    $http
      .get('https://bookclubchat.herokuapp.com/search/title/' + self.searchTitle)
      .then(function(response){
        self.all = response.data;
      });
  };

  function getAuthorSearch(){
    $http
      .get('https://bookclubchat.herokuapp.com/search/author/' + self.searchAuthor)
      .then(function(response){
        self.all = response.data;
      });
  };

};

function BookController ($http) {
  let self = this;

  self.all        = [];
  self.getBooks   = getBooks;
  self.addBook    = addBook;
  self.deleteBook = deleteBook;

  getBooks();

  function getBooks(){
    $http
      .get('https://bookclubchat.herokuapp.com/books/')
      .then(function(response){
        self.all = response.data;
      });
  };

  function addBook(result){
    let newBook = {
      book_id: result.id,
      title: result.volumeInfo.title,
      authors: result.volumeInfo.authors,
      img_url: result.volumeInfo.imageLinks.smallThumbnail
    };

    $http
      .post('https://bookclubchat.herokuapp.com/books/', newBook)
      .then(function(response){
        window.alert('book saved!');
        self.all.push(newBook);
      });
  };

  function deleteBook(book){
    $http
      .delete('https://bookclubchat.herokuapp.com/books/' + book._id, self.deleteBook)
      .then(function(response){
        let index = self.all.indexOf(book);
        self.all.splice(index, 1);
      });
  };

};
