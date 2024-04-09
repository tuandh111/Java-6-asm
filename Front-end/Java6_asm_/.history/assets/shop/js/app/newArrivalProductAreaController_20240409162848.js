
app
    .filter('truncateWordsHTML', function () {
        return function (input, limit) {
            if (!input) return '';

            let words = input.split(' ');
            if (words.length <= limit) {
                return input;
            }
            return words.slice(0, limit).join(' ') + '...';
        };
    })
    .filter('formatPrice', function () {
        return function (input) {
            if (!isNaN(input)) {
                var formattedPrice = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return formattedPrice + ' VND';
            } else {
                return input;
            }
        };
    });
app.controller('NewArrivalProductAreaController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080"
    $scope.getNewArrivalProduct = function () {
        $http.get(url + "/api/v1/auth/twobee/products").then(
            response => {
                // $scope.listNewArrivalProduct = response.data
                $rootScope.listNewArrivalProduct = response.data
                console.log("listNewArrivalProduct", $scope.listNewArrivalProduct);
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }
    $scope.getFiltersProduct = function () {
        $scope.redirectToSingleProduct = function (productId) {
            $location.path('/shop/single-product/' + productId);
        };
    }
    $scope.urlImgProd = (filename) => {
        return "http://localhost:8080/api/v1/auth/twobee/uploadImage/" + filename;
    }
    $scope.getNewArrivalProduct();
    $scope.getFiltersProduct();

    $http({
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
        },

        url: "http://localhost:8080/api/v1/favorites",
    }).then(
        function successCallback(response) {
            $scope.favorites = response.data;
            $('#nav-like__circle').html($scope.favorites.length)
            $scope.isFavorite = function (productId) {
                for (var i = 0; i < $scope.favorites.length; i++) {
                    if ($scope.favorites[i].productId.productId === productId) {
                        return true;
                    }
                }
                return false;
            };
            console.log("isLiked" + $scope.isLiked)
        },
        function errorCallback(response) {
        }
    );
    $scope.addToFavorites = function (productId) {
        var requestData = {
            productId: productId,
            userId: 1,
        };
        $http({
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            data: JSON.stringify(requestData),
            url: "http://localhost:8080/api/v1/save-favorites",
        }).then(
            function successCallback(response) {
                Swal.fire({
                    title: "Thành công!",
                    text: "Thêm vào yêu thích thành công",
                    icon: "success"
                });
                $http({
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },

                    url: "http://localhost:8080/api/v1/favorites",
                }).then(
                    function successCallback(response) {
                        $scope.favorites = response.data;
                        $('#nav-like__circle').html($scope.favorites.length)
                        $scope.isFavorite = function (productId) {
                            for (var i = 0; i < $scope.favorites.length; i++) {
                                if ($scope.favorites[i].productId.productId === productId) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        console.log("isLiked" + $scope.isLiked)
                    },
                    function errorCallback(response) {
                    }
                );
            },
            function errorCallback(response) {
            }
        );
    };
    $scope.removeFromFavorites = function (productId) {
        console.log("Removing")
        var requestData = {
            productId: productId,
            userId: 1,
        };
        $http({
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            data: JSON.stringify(requestData),
            url: "http://localhost:8080/api/v1/delete-favorites",
        }).then(
            function successCallback(response) {
                Swal.fire({
                    title: "Thành công!",
                    text: "Xóa khỏi yêu thích thành công",
                    icon: "success"
                });
                $http({
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },

                    url: "http://localhost:8080/api/v1/favorites",
                }).then(
                    function successCallback(response) {
                        $scope.favorites = response.data;
                        $('#nav-like__circle').html($scope.favorites.length)
                        $scope.isFavorite = function (productId) {
                            for (var i = 0; i < $scope.favorites.length; i++) {
                                if ($scope.favorites[i].productId.productId === productId) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        console.log("isLiked" + $scope.isLiked)
                    },
                    function errorCallback(response) {
                    }
                );
            },
            function errorCallback(response) {
                console.log("error")
            }
        );
    };
})
