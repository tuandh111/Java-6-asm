
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
    $scope.saveCart = function (detailsProductId1) {
        var requestData = {
            productId: detailsProductId1.product.productId,
            quantity: 1,
            userId: null,
            colorId: 1,
            imageId: 1,
            sizeId: 1
        };
        $http({
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            data: JSON.stringify(requestData),
            url: "http://localhost:8080/api/v1/create-cart",
        }).then(function (response) {

            Swal.fire({
                title: "Thành công!",
                text: "Thêm vào giỏ hàng thành công",
                icon: "success",
            });
            $('#quantity_in_stock').html(parseInt(detailsProductId1.product.quantityInStock) - parseInt($scope.quantityProduct));
            $scope.loadData();
            detailsProductId1.product.quantityInStock = (parseInt(detailsProductId1.product.quantityInStock) - parseInt($scope.quantityProduct));
        });
    };
    $scope.loadData = function () {
        $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/cart",
        }).then(
            function successCallback(response) {

                $scope.carts = response.data;
                $scope.countCart = $scope.carts.length
                $('#nav-shop__circle').html($scope.carts.length);
                if ($scope.carts.length === 0) {
                    // $scope.carts là một mảng rỗng
                    $scope.ContinueProduct = 'Tiếp tục mua sắm'
                } else {
                    // $scope.carts không rỗng
                    $scope.ContinueProduct = ''
                }
                $scope.checkAll = false;
                $scope.options = [];
                for (var i = 0; i < $scope.carts.length; i++) {
                    $scope.options[i] = false;
                }

                $scope.$watch("checkAll", function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.options = $scope.options.map(function () {
                            return newValue;
                        });
                    }
                });
                $scope.$watchCollection("options", function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        newValue.forEach(function (value, index) {
                            if (value !== oldValue[index]) {
                                var cartId = $scope.carts[index].cartId;
                                if (value) {
                                    $rootScope.selectedOptions.push(cartId);
                                } else {
                                    var selectedIndex = $rootScope.selectedOptions.indexOf(cartId); // Tìm chỉ số của phần tử đã chọn
                                    if (selectedIndex !== -1) {
                                        $rootScope.selectedOptions.splice(selectedIndex, 1); // Loại bỏ phần tử đã chọn khỏi mảng
                                    }
                                }
                            }
                        });
                        $scope.checkAll = newValue.every(function (value) {
                            return value;
                        });
                        $scope.totalCartValue = 0;
                        $scope.totalCartAll = 0;
                        var selectedOptions = $rootScope.selectedOptions;
                        angular.forEach($scope.carts, function (cart) {
                            if (selectedOptions.includes(String(cart.cartId))) {
                                if ($scope.isDiscounted(cart.product.productId)) {
                                    for (var i = 0; i < $scope.discounts.length; i++) {
                                        if ($scope.discounts[i].product.productId === cart.product.productId) {
                                            cart.totalPrice = cart.quantity * $scope.discounts[i].discountedPrice;
                                            break;
                                        }
                                    }
                                } else {
                                    cart.totalPrice = cart.quantity * cart.product.price;
                                }
                                $scope.totalCartValue += cart.totalPrice;
                            }
                        });

                        if ($scope.totalCartValue > 3000000) {
                            $scope.freeShip = 'Miễn phí giao hàng';
                            $scope.discountTitle = 'Giảm giá đơn hàng:'
                            $scope.discount = ' -150,000 VNĐ'
                            $scope.totalCartAll = $scope.totalCartValue - 150000

                        } else if ($scope.totalCartValue > 100000) {
                            if ($scope.totalCartValue > 999000) {
                                $scope.discountTitle = 'Giảm giá đơn hàng:'
                                $scope.discount = ' -80,000 VNĐ'
                                $scope.totalCartAll = $scope.totalCartValue - 80000

                            } else if ($scope.totalCartValue > 599000) {
                                $scope.discountTitle = 'Giảm giá đơn hàng:'
                                $scope.discount = ' -50,000 VNĐ'
                                $scope.totalCartAll = $scope.totalCartValue - 50000

                            } else {
                                $scope.totalCartAll = $scope.totalCartValue
                                $scope.discountTitle = ''
                                $scope.discount = ''

                            }
                            $scope.freeShip = '25,000 VNĐ';
                            $scope.totalCartAll = $scope.totalCartAll + 25000
                        } else {

                            $scope.discountTitle = ''
                            $scope.discount = ''
                            $scope.freeShip = '';
                            $scope.discount = ''
                        }
                    }
                });

            },
            function errorCallback(response) {
            }
        );
    }
})
