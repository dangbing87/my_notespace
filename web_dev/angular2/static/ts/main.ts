/// <refrence path='lib/angular.d.ts' />

namespace Todo {
    interface ITodo {
        id: string;
        title: string;
        completed: boolean;
    }

    interface ITodoScope extends ng.IScope {
        todos: Array<ITodo>;
        modifyTodoTitle(event: Event, todoId: String, newTitle: string): void;
    }

    interface ITodoRequestParams {
        id: string;
        title?: string;
        completed?: boolean;
    }

    let app: ng.IModule = angular.module('app', []);

    class TodoController {
        static $inject = ['$scope', '$http'];

        constructor($scope: ITodoScope, $http: ng.IHttpService) {
            $http.get('/todo/list').then(function (response) {
                this.getSuccessHandler($scope, response);
            }.bind(this));

            $scope.modifyTodoTitle = function (event: Event, todoId: string,
                newTitle: string) {
                    let todoParam: ITodoRequestParams = {
                        id: todoId,
                        title: newTitle
                    };
                    
                    $http.post('/todo/title', todoParam, function(response) {
                        console.log(response);
                    });
                };
        }

        getSuccessHandler($scope: ITodoScope, response) {
            let todos: Array<ITodo> = response.data.data;
            $scope.todos = response.data.data;
        }
    }
    app.controller('TodoController', TodoController)
}
