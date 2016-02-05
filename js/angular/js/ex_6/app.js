var phonecatApp = angular.module("phonecatApp", [])

phonecatApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
                .when('/phoneList',
                      { templateUrl: "templates/ex_6/list.html",
                        controller: PhoneListCtrl})
                .when('/phoneDetail/:phoneId',
                      { templateUrl: "templates/ex_6/details.html",
                        controller: PhoneDetailCtrl});
}]);
