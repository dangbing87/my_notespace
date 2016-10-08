/// <refrence path='lib/angular.d.ts' />

namespace Todo {
    interface ITodo {
        title: string;
        completed: boolean;
    }

    interface ITodoScope extends ng.IScope {
        todos: Array<ITodo>;
    }

    let app: ng.IModule = angular.module('app', []);

    class TodoController {
        static $inject = ['$scope', '$http'];

        constructor($scope: ITodoScope, $http: ng.IHttpService) {
            $http.get('/todo/list').then(function (response) {
                this.getSuccessHandler($scope, response);
            }.bind(this));

            $scope.test = function(event: Event) {
                console.log(event);
                this.test($http);
            };
        }

        getSuccessHandler($scope: ITodoScope, response) {
            let todos: Array<ITodo> = response.data.data;
            $scope.todos = response.data.data;
        }

        test($http: ng.IHttpService) {
            $http.post('/todo/title', {
                'id': 1212121
            });
        }
    }
    app.controller('TodoController', TodoController)
}
