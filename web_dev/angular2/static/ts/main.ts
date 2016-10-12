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
        todo_id: string;
        title?: string;
        completed?: boolean;
    }

    interface IServerTodo {
        id: string;
        title: string;
        completed: string;
    }

    let app: ng.IModule = angular.module('app', []);

    class TodoController {
        static $inject = ['$scope', '$http'];

        constructor($scope: ITodoScope, $http: ng.IHttpService) {
            $http.get('/todo/list').then(function (response) {
                this.getSuccessHandler($scope, response.data.data);
            }.bind(this));

            $scope.modifyTodoTitle = (event: Event, todoId: string,
                newTitle: string) => {
                let todoParam: ITodoRequestParams = {
                    todo_id: todoId,
                    title: newTitle
                };

                $http.put('/todo/title', todoParam).then(function(response) {
                    console.log(response);
                });
            };
        }

        getSuccessHandler($scope: ITodoScope, todos: Array<IServerTodo>) {
            let todoList: Array<ITodo> = [];

            angular.forEach(todos, (todo: IServerTodo, todoIndext) => {
                let completed: boolean = todo.completed === "true" ?
                    true :
                    false;

                todoList.push({
                    id: todo.id,
                    title: todo.title,
                    completed: completed
                });
            });
            
            $scope.todos = todoList;
        }
    }
    app.controller('TodoController', TodoController)
}
