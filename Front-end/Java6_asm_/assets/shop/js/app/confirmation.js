console.log("This is confirmationController")
app.controller('confirmationController', ['$scope', '$http', function ($scope, $http, $rootScope) {



    $http({
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
        },
        url: "http://localhost:8080/api/v1/get-all-order",
    }).then(
        function successCallback(response) {
            console.log("Success")
            $scope.orders = response.data;
            console.log($scope.orders[0].contactId)

            $http({
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    "X-Refresh-Token": localStorage.getItem("refreshToken"),
                },
                url: "http://localhost:8080/api/v1/contact-by-userId/" + $scope.orders[0].contactId,
            }).then(
                function successCallback(response) {
                    console.log("success")
                    $scope.contact = response.data;
                    console.table($scope.contact)
                },
                function errorCallback(response) {
                    // Xử lý lỗi nếu có
                }
            );
        },
        function errorCallback(response) {
            // Xử lý lỗi nếu có
        }
    );


}]);