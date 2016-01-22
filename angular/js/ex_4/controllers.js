var phonecatApp = angular.module("phonecatApp", [])

phonecatApp.controller("PhoneListCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("/json/ex_4.json")
        .success(function(data) {
            $scope.phones = data;
        });
}]);
