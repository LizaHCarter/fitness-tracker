(function(){
  'use strict';
  angular.module('fitness-tracker')
  .controller('LogoutCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    User.logout().then(function(response){
      toastr.success('Successful logout.');
    });
  }]);
})();
