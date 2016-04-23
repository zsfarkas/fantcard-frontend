angular.module('main',
  ['ngRoute',
   'ngResource',
   'myCards',
   'startBattle',
   'signIn',
   'editCards',
   'navbar',
   'login'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/myCards',
      {
        templateUrl: '/views/myCards/myCards.html',
        controller: 'MyCardsController'
      })
    .when('/startBattle',
      {
        templateUrl: '/views/startBattle/startBattle.html',
        controller: 'StartBattleController'
      })
    .when('/editCards',
      {
        templateUrl: '/views/editCards/editCards.html',
        controller: 'EditCardsController'
      })
      .when('/login',
      {
        templateUrl: '/views/login/login.html',
        controller: 'LoginController'
      })
      .when('/signIn',
      {
        templateUrl: '/views/signIn/signIn.html',
        controller: 'SignInController'
      })
      .otherwise(function() {
        $routeProvider.redirect('/login');
      });

    //$locationProvider.html5Mode(true);
}])

.controller('MainController', ['$scope', '$route', '$location', function($scope, $route, $location) {
}]);
