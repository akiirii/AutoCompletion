angular
    .module('ac.autoCompletion', [])
    .directive('autoCompletion', function() {
        return {
            scope: {
                queryFunction: '&acQuery',
                export: '&acSelect',
                delay: '=acDelay'
            },
            templateUrl: '/static/html/autoCompletion.html',
            controller: ['$scope', '$timeout', '$window', '$element', function($scope, $timeout, $window, $element) {

                var KEY_DOWN = 40;
                var KEY_UP = 38;
                var KEY_ENTER = 13;
                var inputElement = $element.find('input')[0];

                if (!$scope.delay) {
                    $scope.dela = 500;
                };

                $window.onclick = function(event) {
                    $scope.$apply(function() {
                        if (event.target != inputElement) {
                            $scope.searchlist = [];
                        }
                    });
                };

                var searchQuery = function() {
                    if ($scope.timeout) {
                        $timeout.cancel($scope.timeout);
                    }
                    $scope.timeout = $timeout(function() {
                        $scope.searchlist = $scope.queryFunction({
                            $query: $scope.query
                        });
                    }, $scope.delay)
                }

                var markNeighbor = function(step) {
                    var index = $scope.searchlist.indexOf($scope.marked)
                    var next = $scope.searchlist[index + step];
                    if (next) {
                        $scope.marked = next;
                    }
                };

                $scope.keyUp = function($event) {
                    switch ($event.keyCode) {
                        case KEY_DOWN:
                            markNeighbor(1);
                            break;
                        case KEY_UP:
                            markNeighbor(-1);
                            break;
                        case KEY_ENTER:
                            $scope.select($scope.marked);
                            break;
                        default:
                            searchQuery();

                    };
                };
                $scope.test = function() {
                    console.log('asdassafdhgbdfhgbj');
                }

                $scope.select = function(element) {

                    $scope.export({
                        $selected: element
                    })

                    $scope.query = '';
                    $scope.searchlist = [];
                };

                $scope.mark = function(element) {
                    $scope.marked = element;
                };


            }]
        }
    })
