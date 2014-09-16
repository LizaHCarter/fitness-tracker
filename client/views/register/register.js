(function(){
  'use strict';
  angular.module('fitness-tracker')
  .controller('RegisterCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    function success(response){
      toastr.success('User successfully registered.');
      $location.path('/login');
    }

    function failure(){
      toastr.error('Error during user registration. Try again.');
      $scope.user = {};
      $location.path('/');
    }

    $scope.register = function(){
      User.register($scope.user).then(success, failure);
      $scope.user = {};
    };
  }]);
})();
