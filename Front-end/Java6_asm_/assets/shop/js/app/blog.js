console.log("This is blogController")
app.controller('blogController', ['$scope', '$http', function ($scope, $http, $rootScope) {



    $http({
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
        },
        url: "http://localhost:8080/api/v1/auth/post",
    }).then(
        function successCallback(response) {
            $scope.posts = response.data;
            console.table($scope.posts)
        },
        function errorCallback(response) {
            // Xử lý lỗi nếu có
        }
    );


}]);