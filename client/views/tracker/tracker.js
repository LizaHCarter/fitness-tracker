(function(){
  'use strict';

  angular.module('fitness-tracker')
  .controller('TrackerCtrl', ['$scope', 'Activity', 'Meal', 'User', function($scope, Activity, Meal, User){
    $scope.meal = {};
    $scope.meals =[];
    $scope.activity = {};
    $scope.activities = [];
    $scope.user = {};
    $scope.days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.calories = 0;

    User.find().then(function(response){
      $scope.user = response.data.user;
      $scope.calories = (($scope.user.cWeight * 1) - ($scope.user.gWeight * 1)) * 3500;
    });

    Activity.all().then(function(response){
      $scope.activities = response.data.activities;
    });

    Meal.all().then(function(response){
      $scope.meals = response.data.meals;
    });

    $scope.filterActivities = function(day){
      if(day === 'All'){
        $scope.filteredA = $scope.activities;
      }else{
        $scope.filteredA = $scope.activities.filter(function(activity){
          return activity.day === day;
        });
      }
    };

    $scope.filterMeals = function(day){
      if(day === 'All'){
        $scope.filteredM = $scope.meals;
      }else{
        $scope.filteredM = $scope.meals.filter(function(meal){
          return meal.day === day;
        });
      }
    };

    $scope.addActivity = function(){
      Activity.create($scope.activity).then(function(response){
        $scope.activities.push(response.data.activity);
        $scope.calories -= (response.data.activity.calories * 1);
        $scope.activity = {};
      });
    };

    $scope.addMeal = function(){
      Meal.create($scope.meal).then(function(response){
        $scope.meals.push(response.data.meal);
        $scope.calories += (response.data.meal.calories * 1);
        $scope.meal = {};
      });
    };
  }]);
})();
