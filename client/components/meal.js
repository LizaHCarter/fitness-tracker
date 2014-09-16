(function(){
  'use strict';

  angular.module('fitness-tracker')
  .factory('Meal', ['$http', function($http){

    function create(meal){
      return $http.post('/meals', meal);
    }

    function all(){
      return $http.get('/meals');
    }

    return {create:create, all:all};
  }]);
})();

