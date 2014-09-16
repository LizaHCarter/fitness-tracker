(function(){
  'use strict';
  angular.module('fitness-tracker')
  .controller('LoginCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    function success(response){
      toastr.success('User successfully logged in.');
      $location.path('/');
    }

    function failure(){
      toastr.error('Error during user login. Try again.');
      $scope.user = {};
    }
    $scope.login = function(){
      User.login($scope.user).then(success, failure);
    };
  }]);
})();
