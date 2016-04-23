angular.module("navbar", [])

.controller('NavbarController', ['$scope', '$location', function($scope, $location) {
  $scope.$location = $location;
}]);
