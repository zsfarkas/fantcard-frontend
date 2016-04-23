angular.module('main')

.factory('User', ['$resource', function($resource) {
  return $resource('/auth/users');
}]);
