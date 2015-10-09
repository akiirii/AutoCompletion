angular.module('demo', [
    'ac.autoCompletion'
]).controller('appController', ['$scope', '$http', function($scope) {

    $scope.delay = 500;
    $scope.minlength = 5;

    $scope.select = function(selected) {
        $scope.selected = selected;
    };

    $scope.search = function(query) {
        return [{
            name: 'abc'
        }, {
            name: 'abcde'
        }, {
            name: 'abcsdsd'
        }, {
            name: 'aasdsadcsdsd'
        }];
    }
}]);
