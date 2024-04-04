console.log('AdminOrderController')

app.controller('AdminOrderController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080"

    $scope.listOrderFilter = [];
    $scope.listOrderShow = [];//để chứa kết quả show lên giao diện
    $scope.filteredOrders = [];
    $scope.begin = 0;
    $scope.pageSize = 5;
    // $scope.searchOrdersName = '';

    $scope.listCartFilter = [];
    $rootScope.listCartFilterByCartId = [];//để chứa kết quả show lên giao diện
    $scope.filteredCarts = [];
    $rootScope.userInfo = {};
    $rootScope.prodInfo = {};
    $scope.listProducts = [];
    $scope.listProductsFilter = [];
    $scope.listSizesFilter = [];
    $scope.listColorsFilter = [];

    $scope.selectedStatus = ''

    $scope.getOrders = function () {
        $http.get(url + "/api/v1/auth/twobee/orders").then(respone => {
            $scope.listOrderFilter = respone.data;
            $scope.listOrderShow = $scope.listOrderFilter;
            console.log(" $scope.listOrderShow ", $scope.listOrderShow);
            $scope.pageCount = Math.ceil($scope.listOrderShow.length / $scope.pageSize);
            $scope.firtPage = function () {
                $scope.begin = 0;
            }
            $scope.prevPage = function () {
                if ($scope.begin > 0) {
                    $scope.begin -= $scope.pageSize;
                }
            }
            $scope.nextPage = function () {
                if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                    $scope.begin += $scope.pageSize;
                }
            }
            $scope.lastPage = function () {
                $scope.begin = ($scope.pageCount - 1) * $scope.pageSize
            }
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.getCarts = function () {
        $http.get(url + "/api/v1/auth/twobee/carts").then(respone => {
            $scope.listCartFilter = respone.data;
            // $scope.listCartFilterByCartId = $scope.listCartFilter;
            // console.log("$scope.listCartFilter ", $scope.listCartFilter);
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.getProducts = function () {
        $http.get(url + "/api/v1/auth/twobee/products").then(respone => {
            console.log("allproduct", respone.data);
            $scope.listProductsFilter = respone.data;
            $rootScope.getProductById = function (prodId) {
                console.log("aaa");
                return $scope.listProductsFilter.find(function (product) {
                    return product.product.productId == prodId;
                });
            };
            console.log(" $rootScope.getProductById 10", $rootScope.getProductById(10));
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.getSizes = function () {
        $http.get(url + "/api/v1/auth/twobee/sizes").then(respone => {
            $scope.listSizesFilter = respone.data;
            $rootScope.getSizeById = function (sizeId) {
                return $scope.listSizesFilter.find(function (size) {
                    return size.sizeId == sizeId;
                });
            };
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.getColors = function () {
        $http.get(url + "/api/v1/auth/twobee/colors").then(respone => {
            $scope.listColorsFilter = respone.data;
            $rootScope.getColorById = function (colorId) {
                return $scope.listColorsFilter.find(function (color) {
                    return color.colorId == colorId;
                });
            };
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.filterOrder = function () {
        $scope.filerCartByCartId = function (dataCartId) {
            $scope.filteredCarts = $scope.listCartFilter.filter(cart => dataCartId.includes(cart.cartId))
            $rootScope.listCartFilterByCartId = $scope.filteredCarts
            if ($scope.filteredCarts && $scope.filteredCarts.length > 0 && $scope.filteredCarts[0].user !== undefined) {
                $rootScope.userInfo = $scope.filteredCarts[0].user;
            } else {
                $rootScope.userInfo = null;
            }
            console.log("$rootScope.userInfo", $rootScope.userInfo);
        }

    }

    $scope.updateStatus = function () {
        alert($scope.selectedStatus)
    };


    $scope.getOrders();
    $scope.getCarts();
    $scope.getProducts();
    $scope.getSizes();
    $scope.getColors();
    $scope.filterOrder();
})

