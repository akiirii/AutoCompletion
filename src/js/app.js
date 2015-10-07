angular.module('demo', [
    'ac.autoCompletion'
]).controller('appController', ['$scope', function($scope) {

    $scope.delay = 500;

    $scope.select = function(selected) {
        console.log('AUT - Selected:', selected)
    };

    $scope.search = function(query) {
        console.log('AUT - Query:', query);
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
