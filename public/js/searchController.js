'use strict';

angular.module('TheBookApp', [])
  .controller('SearchController', SearchController);

SearchController.$inject = ['$http'];

function SearchController ($http) {
  let self = this;

  // crud functions
  self.all = [];
  self.getSearch = getSearch;
  self.getTitleSearch = getTitleSearch;
  self.getAuthorSearch = getAuthorSearch;

  function getSearch(){

    $http
      .get('http://localhost:3000/search/term/' + this.searchTerm)
      .then(function(response){
        self.all = response.data;
      });
  }

  function getTitleSearch(){

    $http
      .get('http://localhost:3000/search/title/' + this.searchTitle)
      .then(function(response){
        self.all = response.data;
      });
  }

  function getAuthorSearch(){

    $http
      .get('http://localhost:3000/search/author/' + this.searchAuthor)
      .then(function(response){
        self.all = response.data;
      });
  }

}
