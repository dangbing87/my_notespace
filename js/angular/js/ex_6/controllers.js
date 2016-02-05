function PhoneListCtrl($scope, $http)
{
    $http.get("/json/ex_4.json")
        .success(function(data) {
            $scope.phones = data;
        });
}

function PhoneDetailCtrl($scope, $routeParams)
{
    $scope.phoneId = $routeParams.phoneId;
}
