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

.directive("isSameAs", function () {

    return {
        require: 'ngModel',
        scope: {
            isSameAs: '=isSameAs'
                // Ausdruck von Attribut is-same-as an
                // scope-interne Variable isSameAs binden
        },
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.isSameAs = function (viewValue, modelValue) {

                var currentValue = viewValue || modelValue;

                if (currentValue === scope.isSameAs.$modelValue) {
                    //ctrl.$setValidity('isSameAs', true);
                    return true;
                } else {
                    //ctrl.$setValidity('isSameAs', false);
                    return false;
                }
            };
        }
    };

})

.controller('SignInController', ['$scope', 'User', function($scope, User) {
  $scope.user = {};

  $scope.serverErrors = [];

  $scope.registerUser = function() {
    $scope.serverErrors = [];
    User.save($scope.user,
      function(success) {
        location.replace('/');
      },
      function(err) {
        console.log(err);
        $scope.serverErrors.push('Die Registation ist leider fehlgeschlagen. Versuche es noch mal.');
      }
    );
  };

  $scope.showError = function(viewModel) {
    return viewModel && viewModel.$dirty && viewModel.$invalid;
  };
}]);
