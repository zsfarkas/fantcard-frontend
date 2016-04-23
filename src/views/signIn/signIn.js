angular.module('signIn', [])

.directive('userIdExists', ['$q', 'User', function($q, User) {
  return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.userIdExists = function(modelValue, viewValue) {
          var defer = $q.defer();
          var userIdValue = modelValue || viewValue;
          User.get(
            {
              "userId": userIdValue
            },
            function(err) {
              return defer.reject();
            },
            function(success) {
              return defer.resolve();
            });

          return defer.promise;
        };
      }
    };
}])

.directive('samePassword', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.samePassword = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        console.log(ngModel);
      };
    }
  };
})

.controller('SignInController', ['$scope', 'User', function($scope, User) {
  $scope.user = {};

  $scope.registerUser = function() {
    User.save($scope.user, function(err) {console.log(err);}, function(success) {console.log(success);});
  };

  $scope.showError = function(viewModel) {
    return (viewModel.$dirty && viewModel.$invalid);
  };
}]);
