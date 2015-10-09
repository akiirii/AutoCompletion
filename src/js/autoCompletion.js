angular
    .module('ac.autoCompletion', [])
    .directive('autoCompletion', function() {
        return {
            scope: {
                queryFunction: '&acQuery',
                export: '&acSelect',
                delay: '=acDelay',
                minlength: '=acMinlength'
            },
            template: ' <div class="ac-autoCompletion">' +
                '<input type="text" ng-model="query" ng-click="test()" ng-keyup="keyUp($event)"/>' +
                '<ul>' +
                '<li ng-repeat="element in searchlist" ng-click="select(element)" ng-mouseenter="mark(element)" ng-class="{active: element == marked}"> {{element.name}}</li>' +
                '</ul>' +
                '</div>',
            controller: ['$scope', '$timeout', '$window', '$element', function($scope, $timeout, $window, $element) {
                var KEY_DOWN = 40;
                var KEY_UP = 38;
                var KEY_ENTER = 13;
                var inputElement = $element.find('input')[0];
                if (!$scope.delay) {
                    $scope.delay = 500;
                };

                if (!$scope.maxlength) {
                    $scope.maxlength = 3;
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
                    if ($scope.query.length >= $scope.maxlength) {

                        $scope.timeout = $timeout(function() {
                            $scope.searchlist = $scope.queryFunction({
                                $query: $scope.query
                            });
                        }, $scope.delay)
                    }

                }

                var markNeighbor = function(step) {
                    if ($scope.searchlist) {
                        var index = $scope.searchlist.indexOf($scope.marked)

                        var next = $scope.searchlist[index + step];
                        if (next) {
                            $scope.marked = next;
                        }
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

                $scope.select = function(element) {
                    $scope.export({
                        $selected: element
                    })

                    $scope.query = element.name;
                    $scope.searchlist = [];
                };

                $scope.mark = function(element) {
                    $scope.marked = element;
                };

            }]
        }
    })
