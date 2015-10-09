angular.module('demo', [
    'ac.autoCompletion'
]).controller('appController', ['$scope', '$http', function($scope, $http) {

    $scope.delay = 500;
    $scope.minlength = 5;

    $scope.select = function(selected) {
        $scope.selected = selected;
        console.log(selected)
    };

    $scope.search = function(query) {
        return $http.get('http://it-ebooks-api.info/v1/search/' + query).then(function(response) {
            return response.data
        })
    }
}]);
