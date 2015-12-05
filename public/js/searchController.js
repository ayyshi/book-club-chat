'use strict';

angular.module('TheBookApp', [])
  .controller('SearchController', SearchController);

SearchController.$inject = ['$http'];

function SearchController ($http) {
  let self = this;

  // crud functions
  self.all = [];
  self.getSearch = getSearch;

  getSearch();

  function getSearch(){
    $http
      .get('http://localhost:3000/search/')
      .then(function(response){
        self.all = response.data;
      });
  }

}
