(function(){
  'use strict';

  angular.module('fitness-tracker')
  .factory('Activity', ['$http', function($http){

    function create(activity){
      return $http.post('/activities', activity);
    }

    function all(){
      return $http.get('/activities');
    }

    return {create:create, all:all};
  }]);
})();

