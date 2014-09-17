(function(){
  'use strict';

  angular.module('fitness-tracker')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(user){
      return $http.delete('/logout', user);
    }

    function find(){
      return $http.get('/user');
    }

    function newGoal(user){
      return $http.post('/newGoal', user);
    }

    return {register:register, login:login, logout:logout, find:find, newGoal:newGoal};
  }]);
})();

