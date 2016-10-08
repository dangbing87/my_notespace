/// <refrence path='lib/angular.d.ts' />
var Todo;
(function (Todo) {
    var app = angular.module('app', []);
    var TodoController = (function () {
        function TodoController($scope, $http) {
            $http.get('/todo/list').then(function (response) {
                this.getSuccessHandler($scope, response);
            }.bind(this));
            $scope.test = function (event) {
                console.log(event);
                this.test($http);
            };
        }
        TodoController.prototype.getSuccessHandler = function ($scope, response) {
            var todos = response.data.data;
            $scope.todos = response.data.data;
        };
        TodoController.prototype.test = function ($http) {
            $http.post('/todo/title', {
                'id': 1212121
            });
        };
        TodoController.$inject = ['$scope', '$http'];
        return TodoController;
    }());
    app.controller('TodoController', TodoController);
})(Todo || (Todo = {}));
