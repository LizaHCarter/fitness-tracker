(function(){
  'use strict';

  angular.module('fitness-tracker')
  .controller('TrackerCtrl', ['$scope', 'Activity', 'Meal', function($scope, Activity, Meal){
    $scope.meal = {};
    $scope.meals =[];
    $scope.activity = {};
    $scope.activities = [];
    $scope.user = {};

    $scope.addActivity = function(){
      Activity.create($scope.activity).then(function(response){
        $scope.activities.push(response.data.activity);
        $scope.activity = {};
      });
    };

    $scope.addMeal = function(){
      Meal.create($scope.meal).then(function(response){
        $scope.meals.push(response.data.meal);
        $scope.meal = {};
      });
    };
  }]);
})();
