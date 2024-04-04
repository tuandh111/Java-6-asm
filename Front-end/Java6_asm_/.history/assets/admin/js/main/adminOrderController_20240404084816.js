console.log('AdminOrderController')
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
            console.log("$scope.listCartFilter ", $scope.listCartFilter);
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.filterOrder = function () {
        $scope.filerCartByCartId = function (dataCartId) {
            $scope.filteredCarts = $scope.listCartFilter.filter(cart => dataCartId.includes(cart.carrtId))
            $rootScope.listCartFilterByCartId = $scope.filteredCarts
        }
    }


    $scope.getOrders();
    $scope.getCarts();
    $scope.filterOrder();
})

