'use strict';

angular.module('TheBookApp', [])
  .controller('SearchController', SearchController)
  .controller('BookController', BookController)

SearchController.$inject = ['$http'];
BookController.$inject = ['$http'];

function SearchController ($http) {
  let self = this;

  self.all = [];
  self.getSearch = getSearch;
  self.getTitleSearch = getTitleSearch;
  self.getAuthorSearch = getAuthorSearch;

  function getSearch(){

    $http
      .get('http://localhost:3000/search/term/' + self.searchTerm)
      .then(function(response){
        self.all = response.data;
      });
  }

  function getTitleSearch(){

    $http
      .get('http://localhost:3000/search/title/' + self.searchTitle)
      .then(function(response){
        self.all = response.data;
      });
  }

  function getAuthorSearch(){

    $http
      .get('http://localhost:3000/search/author/' + self.searchAuthor)
      .then(function(response){
        self.all = response.data;
      });
  }

}

function BookController ($http) {
  let self = this;

  // crud functions
  self.all = [];
  self.addBook = addBook;
  // self.newBook = {};

  function addBook(result){
    console.log('hitting here');
    console.log(result);
    let newBook = {
      book_id: result.id,
      title: result.volumeInfo.title,
      authors: result.volumeInfo.authors,
      img_url: result.volumeInfo.imageLinks.smallThumbnail
    }

    $http
      .post('http://localhost:3000/books/', newBook)
      .then(function(response){
        console.log('book added');
      });
      self.newBook = {};
  }

}
