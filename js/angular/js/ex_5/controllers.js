var phoneApp = angular.module("phoneApp", []);

phoneApp.controller("PhoneCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.phoneList = new Array();

    function getPhoneList()
    {
        $http.get("/json/ex_4.json")
             .success(function(data) {
                $(data).each(function(i, v) {
                    $scope.phoneList.push(v);
                });
            });
    };

    $scope.init = (function() {
        getPhoneList();
    })();

    $scope.updatePhoneList = function() {
        getPhoneList();
    };
}]);
