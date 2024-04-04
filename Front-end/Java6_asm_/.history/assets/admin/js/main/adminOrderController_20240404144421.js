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

    $scope.updateStatus = function (order) {
        // console.log("New status:", order);
        var orderId = order.orderId
        if (order.status == 'Đã hủy') {
            Swal.fire({
                title: 'Xác nhận huỷ đơn hàng',
                text: 'Bạn có chắc muốn huỷ đơn hàng?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy bỏ'
            }).then((rs) => {
                console.log("rs.isConfirmed", rs.isConfirmed);
                if (rs.isConfirmed) {
                    Swal.fire({
                        title: 'Nhập lý do huỷ đơn hàng',
                        input: 'text',
                        inputPlaceholder: 'Nhập lý do ở đây...',
                        showCancelButton: true,
                        confirmButtonText: 'Gửi',
                        cancelButtonText: 'Hủy bỏ',
                        showLoaderOnConfirm: true
                    }).then((reason) => {
                        order.note = reason.value
                        // console.log("Sau huy ", order);
                        var requsetOrderJSON = angular.toJson(order)
                        $http.put(url + "/api/v1/auth/twobee/orders/" + orderId, requsetOrderJSON).then(
                            respone => {
                                console.log(respone.data);
                                Swal.fire('Thành công', 'Hủy đơn hàng thành công.', 'success');
                            }
                        ).catch(err => {
                            console.log(err.data);
                            Swal.fire('Lỗi', 'Đã xảy ra lỗi khi hủy đơn hàng.', 'error');
                        })
                    });
                } else {
                    order.status = 'Đặt hàng';
                    console.log("order.status", order.status);
                }
            });

        } else if (order.status == 'Thành công') {
            Swal.fire({
                title: 'Xác nhận đơn hàng thành công',
                text: 'Bạn có chắc muốn cập nhật đơn hàng thành công?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy bỏ'
            }).then((rs) => {

                if (rs.isConfirmed) {
                    Swal.fire({
                        title: 'Nhập ghi chú đơn hàng',
                        input: 'text',
                        inputPlaceholder: 'Nhập ghi chú ở đây...',
                        showCancelButton: true,
                        confirmButtonText: 'Gửi',
                        cancelButtonText: 'Hủy bỏ',
                        showLoaderOnConfirm: true
                    }).then((reason) => {
                        order.note = reason.value
                        console.log("after Thanh cong:", order);
                        var requsetOrderJSON = angular.toJson(order)
                        $http.put(url + "/api/v1/auth/twobee/orders/" + orderId, requsetOrderJSON).then(
                            respone => {
                                console.log(respone.data);
                                Swal.fire('Thành công', 'Xác nhận đơn hàng thành công.', 'success');
                            }
                        ).catch(err => {
                            console.log(err.data);
                            Swal.fire('Lỗi', 'Đã xảy ra lỗi khi xác nhận đơn hàng.', 'error');
                        })
                    });
                }

            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Đơn hàng đang chờ xác nhận !',
                showConfirmButton: false,
                timer: 2000
            });
        }

    };


    $scope.getOrders();
    $scope.getCarts();
    $scope.getProducts();
    $scope.getSizes();
    $scope.getColors();
    $scope.filterOrder();
})

