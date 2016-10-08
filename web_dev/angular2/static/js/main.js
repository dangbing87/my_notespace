/// <refrence path='lib/angular.d.ts' />
var Todo;
(function (Todo) {
    var app = angular.module('app', []);
    var TodoController = (function () {
        function TodoController($scope, $http) {
            $http.get('/todo/list').then(function (response) {
                this.getSuccessHandler($scope, response);
            }.bind(this));
            $scope.modifyTodoTitle = function (event, todoId, newTitle) {
                var todoParam = {
                    id: todoId,
                    title: newTitle
                };
                $http.post('/todo/title', todoParam, function (response) {
                    console.log(response);
                });
            };
        }
        TodoController.prototype.getSuccessHandler = function ($scope, response) {
            var todos = response.data.data;
            $scope.todos = response.data.data;
        };
        TodoController.$inject = ['$scope', '$http'];
        return TodoController;
    })();
    app.controller('TodoController', TodoController);
})(Todo || (Todo = {}));
