var todoApp = angular.module("todoApp", []);

function TodoListCtrl($scope)
{

    var clearAddInput = function() {
        $scope.todoItem = "";
    };

    $scope.todoList = [];

    $scope.addItem = function() {
        var todoItem = {
            "item": $scope.todoItem,
            "isFinish": false
        };

        clearAddInput();
        $scope.todoList.push(todoItem);
    };

    $scope.setEditStatus = function(itemKey) {
        $($scope.todoList).each(function(index, item) {
            if (item.$$hashKey == itemKey) {
                item.isEdit = true;
                return;
            }
        });
    };

    $scope.done = function(itemKey) {
        $($scope.todoList).each(function(index, item) {
            if (item.$$hashKey == itemKey) {
                item.isFinish = true;
                return;
            }
        });
    };
}

todoApp.controller("TodoListCtrl", ["$scope", function($scope) {
    TodoListCtrl($scope);
}]);
