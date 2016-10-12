/// <refrence path='lib/angular.d.ts' />
var Todo;
(function (Todo) {
    var app = angular.module('app', []);
    var TodoController = (function () {
        function TodoController($scope, $http) {
            $http.get('/todo/list').then(function (response) {
                this.getSuccessHandler($scope, response.data.data);
            }.bind(this));
            $scope.modifyTodoTitle = function (event, todoId, newTitle) {
                var todoParam = {
                    todo_id: todoId,
                    title: newTitle
                };
                $http.put('/todo/title', todoParam).then(function (response) {
                    console.log(response);
                });
            };
        }
        TodoController.prototype.getSuccessHandler = function ($scope, todos) {
            var todoList = [];
            angular.forEach(todos, function (todo, todoIndext) {
                var completed = todo.completed === "true" ?
                    true :
                    false;
                todoList.push({
                    id: todo.id,
                    title: todo.title,
                    completed: completed
                });
            });
            $scope.todos = todoList;
        };
        TodoController.$inject = ['$scope', '$http'];
        return TodoController;
    }());
    app.controller('TodoController', TodoController);
})(Todo || (Todo = {}));
