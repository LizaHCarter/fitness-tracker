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
      $scope.bmi = ((response.data.user.cWeight/(response.data.user.height*response.data.user.height))*703).toFixed(2);
      $scope.calories = response.data.user.calories.toFixed(2);
      $scope.user.cWeight = response.data.user.cWeight.toFixed(2);
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
        $scope.calories = response.data.user.calories;
        $scope.user.cWeight  = response.data.user.cWeight.toFixed(2);
        $scope.bmi = ((response.data.user.cWeight/(response.data.user.height*response.data.user.height))*703).toFixed(2);
        if($scope.calories <= 0){
          $scope.goal = true;
          toastr.success('You reached your goal.');
        }
        $scope.activity = {};
      });
    };

    $scope.addMeal = function(){
      Meal.create($scope.meal).then(function(response){
        $scope.meals.push(response.data.meal);
        $scope.calories = response.data.user.calories;
        $scope.user.cWeight  = response.data.user.cWeight.toFixed(2);
        $scope.bmi = ((response.data.user.cWeight/(response.data.user.height*response.data.user.height))*703).toFixed(2);
        $scope.meal = {};
      });
    };

    $scope.newGoal = function(){
      User.newGoal($scope.user).then(function(response){
        $scope.user.gWeight = response.data.user.gWeight;
        $scope.calories = response.data.user.calories.toFixed(2);
        $scope.goal = false;
      });
    };
  }]);
})();
