(function(){
  'use strict';

  angular.module('fitness-tracker', ['ngRoute', 'LocalForageModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login', {templateUrl:'/views/login/login.html', controller:'LoginCtrl'})
    .when('/logout', {templateUrl:'/views/logout/logout.html', controller:'LogoutCtrl'})
    .when('/tracker', {templateUrl:'/views/tracker/tracker.html', controller:'TrackerCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'fitness-tracker', storeName:'cache', version:1.0});
  }]);
})();

