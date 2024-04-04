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
    $scope.listProductsFilter = []

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
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.filterOrder = function () {
        $scope.filerCartByCartId = function (dataCartId) {
            $scope.filteredCarts = $scope.listCartFilter.filter(cart => dataCartId.includes(cart.cartId))
            $rootScope.listCartFilterByCartId = $scope.filteredCarts
            $rootScope.userInfo = $scope.filteredCarts[0].user

        }
        $scope.getProductById = function (prodId) {
            return $scope.listProductsFilter.find(function (product) {
                return product.product.id == prodId;
            });
        };
    }


    $scope.getOrders();
    $scope.getCarts();
    $scope.getProducts();
    $scope.filterOrder();
})

