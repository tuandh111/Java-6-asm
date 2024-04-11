console.log("This is confirmationController")
app.controller('confirmationController', ['$scope', '$http', function ($scope, $http, $rootScope) {
    $scope.count = 0;
    $scope.coutPT = 0;
    $scope.voucherId;
    localStorage.removeItem("checkCartId");
    $http({
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
        },
        url: "http://localhost:8080/api/v1/cart",
    }).then(
        function successCallback(response) {
            console.log("Success callback");
            $scope.carts = response.data;
            $scope.countCart = $scope.carts.length
            $('#nav-shop__circle').html($scope.carts.length);


        },
        function errorCallback(response) {
        }
    );
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

            console.table($scope.orders)
            $scope.filterOrdersByDate = function () {
                $scope.filteredOrders = $scope.orders.filter(function (od) {
                    var orderDate = new Date(od.createAt);
                    var startDate = new Date($scope.startDate);
                    var endDate = new Date($scope.endDate);

                    return orderDate >= startDate && orderDate <= endDate;
                });
            };
            $scope.selectedStatus = '';

            $scope.filterOrdersByStatus = function () {
                if ($scope.selectedStatus === 'all') {
                    $scope.filteredOrders = $scope.orders;
                } else {
                    $scope.filteredOrders = $scope.orders.filter(function (order) {
                        return order.status === $scope.selectedStatus;
                    });
                }
            };

            $scope.onStatusChange = function () {
                console.log('onStatusChange')
                $scope.filterOrdersByStatus();
            };
            $scope.filteredOrders = $scope.orders;
            $http({
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    "X-Refresh-Token": localStorage.getItem("refreshToken"),
                },
                url: "http://localhost:8080/api/v1/contact-by-userId",
            }).then(
                function successCallback(response) {
                    console.log("success")
                    $scope.contacts = response.data;
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
    $scope.details = function (order) {
        $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/orders/" + order.contactId,
        }).then(
            function successCallback(response) {
                console.log("Success")
                $scope.ordersContact = response.data;
                console.log($scope.ordersContact);
                $scope.contactIdItem = $scope.ordersContact[0].contactId;
            },
            function errorCallback(response) {

                // Xử lý lỗi nếu có
            }
        );



        $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/get-all-orderId/" + order.orderId,
        }).then(
            function successCallback(response) {
                console.log("success cart")
                $scope.carts = response.data;

                $http({
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },
                    url: "http://localhost:8080/api/v1/auth/voucherId/" + $scope.carts[0].voucherId,
                }).then(
                    function successCallback(response) {
                        $scope.voucher = response.data;
                        $scope.count = $scope.voucher.condition;
                        $scope.coutPT = $scope.voucher.amountPercentage;
                        $scope.voucherId;
                    },
                    function errorCallback(response) {

                        // Xử lý lỗi nếu có
                    }
                );


                var cartIds = [];
                for (var i = 0; i < $scope.carts.length; i++) {
                    var cart = $scope.carts[i];
                    if (cart && typeof cart.cartId === 'string') {
                        cartIds.push(cart.cartId);
                    }
                }
                $scope.detailsOrder = "Chi tiết đơn hàng của " + order.orderId;
                // const storedCartIds = cartIds;
                // const cartIdsArray = storedCartIds.split(',');
                // const trimmedCartIdsArray = cartIdsArray.map(id => id.trim());
                const uniqueCartIds = [...new Set(cartIds)];
                var requestData = {
                    cartId: uniqueCartIds,
                    userId: 4
                };
                $http({
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },

                    data: JSON.stringify(requestData),
                    url: "http://localhost:8080/api/v1/get-cartId",
                }).then(function (response) {
                    $scope.checkOutCartId = response.data
                    $scope.totalAmount = 0;
                    $scope.totalCartAll = 0;
                    console.log("checkOut_", $scope.checkOutCartId)
                    loadDiscounts().then(function (discounts) {
                        $scope.discounts = discounts;

                        $scope.checkOutCartId.forEach(function (item) {
                            var isDiscountApplied = false;
                            $scope.discounts.forEach(function (discount) {
                                if (item.product.productId === discount.product.productId) {
                                    $scope.totalAmount += (discount.discountedPrice * item.quantity);
                                    isDiscountApplied = true;
                                }
                            });
                            if (!isDiscountApplied) {
                                $scope.totalAmount += (item.product.price * item.quantity);
                            }
                        });

                        if ($scope.totalAmount > 3000000) {
                            $scope.freeShip = 'Miễn phí giao hàng';
                            $scope.discountTitle = 'Giảm giá đơn hàng:'
                            $scope.discount = ' -150,000 VNĐ'

                            if ($scope.count > 0) {
                                $scope.totalCartAll = $scope.totalAmount - $scope.count

                            }
                            if ($scope.coutPT > 0) {
                                $scope.totalCartAll = $scope.totalAmount - ($scope.totalAmount * ($scope.coutPT / 100))
                            }
                            $scope.totalCartAll = $scope.totalCartAll - 150000

                        } else if ($scope.totalAmount > 100000) {
                            if ($scope.totalAmount > 999000) {
                                $scope.discountTitle = 'Giảm giá đơn hàng:'
                                $scope.discount = ' -80,000 VNĐ'
                                $scope.totalCartAll = $scope.totalAmount - 80000

                            } else if ($scope.totalAmount > 599000) {
                                $scope.discountTitle = 'Giảm giá đơn hàng:'
                                $scope.discount = ' -50,000 VNĐ'
                                $scope.totalCartAll = $scope.totalAmount - 50000

                            } else {
                                $scope.totalCartAll = $scope.totalAmount
                                $scope.discountTitle = ''
                                $scope.discount = ''

                            }
                            if ($scope.count > 0) {
                                $scope.totalCartAll = $scope.totalCartAll - $scope.count
                            }
                            else if ($scope.coutPT > 0) {
                                $scope.totalCartAll = $scope.totalCartAll - ($scope.totalAmount * ($scope.coutPT / 100))
                            }

                            $scope.freeShip = '+25,000 VNĐ';
                            $scope.totalCartAll = $scope.totalCartAll + 25000
                        } else {

                            $scope.discountTitle = ''
                            $scope.discount = ''
                            $scope.freeShip = '';
                            $scope.discount = ''
                        }
                        console.log('Tổng tiền chiết khấu: ' + $scope.totalAmount);
                    }).catch(function (error) {

                    });

                });

            },
            function errorCallback(response) {
            }
        );
    }

    $scope.deleteOd = function (order) {
        var createdAt = moment(order.createAt);
        var currentTime = moment();
        var duration = moment.duration(currentTime.diff(createdAt));
        var hoursSinceCreation = duration.asHours();

        if (hoursSinceCreation <= 24) {
            if (order.payments == 'VNPAY') {
                Swal.fire({
                    title: "Huỷ đơn hàng",
                    text: "Bạn có muốn hủy đơn hàng VNPAY?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Chấp nhận!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        var requestData = {
                            note: 'Đang chờ hoàn tiền',
                            status: 'Hủy đơn VNPAY',
                        };
                        $http({
                            method: "PUT",
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                                "X-Refresh-Token": localStorage.getItem("refreshToken"),
                            },
                            data: JSON.stringify(requestData),
                            url: "http://localhost:8080/api/v1/update-order/" + order.orderId,
                        }).then(function (response) {
                            Swal.fire({
                                title: "Thành công!",
                                text: "Hãy đợi cửa hàng xác nhận hoàn tiền lại",
                                icon: "success",
                            });
                            $http({
                                method: "GET",
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                                    "X-Refresh-Token": localStorage.getItem("refreshToken"),
                                },
                                url: "http://localhost:8080/api/v1/get-all-order",
                            }).then(
                                function successCallback(response) {
                                    $scope.orders = response.data;

                                    console.table($scope.orders)
                                    $scope.filterOrdersByDate = function () {
                                        $scope.filteredOrders = $scope.orders.filter(function (od) {
                                            var orderDate = new Date(od.createAt);
                                            var startDate = new Date($scope.startDate);
                                            var endDate = new Date($scope.endDate);

                                            return orderDate >= startDate && orderDate <= endDate;
                                        });
                                    };
                                    $scope.selectedStatus = '';

                                    // Hàm để lọc danh sách đơn hàng dựa trên trạng thái được chọn
                                    $scope.filterOrdersByStatus = function () {
                                        $scope.filteredOrders = $scope.orders.filter(function (order) {
                                            return order.status === $scope.selectedStatus;
                                        });
                                    };

                                    $scope.onStatusChange = function () {
                                        console.log('onStatusChange')
                                        $scope.filterOrdersByStatus();
                                    };

                                    // Khởi tạo filteredOrders ban đầu bằng toàn bộ danh sách orders
                                    $scope.filteredOrders = $scope.orders;
                                    $http({
                                        method: "GET",
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("accessToken"),
                                            "X-Refresh-Token": localStorage.getItem("refreshToken"),
                                        },
                                        url: "http://localhost:8080/api/v1/contact-by-userId",
                                    }).then(
                                        function successCallback(response) {
                                            console.log("success")
                                            $scope.contacts = response.data;
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
                        });

                    }
                });
                return;

            }
            Swal.fire({
                title: "Huỷ đơn hàng",
                text: "Bạn có muốn hủy đơn hàng?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Chấp nhận!"
            }).then((result) => {
                if (result.isConfirmed) {
                    $http({
                        method: "DELETE",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("accessToken"),
                            "X-Refresh-Token": localStorage.getItem("refreshToken"),
                        },
                        url: "http://localhost:8080/api/v1/delete-orders/" + order.orderId,
                    }).then(
                        function successCallback(response) {
                            console.log("Success");
                            Swal.fire({
                                title: "Thành công!",
                                text: "Xóa đơn hàng thành công",
                                icon: "success"
                            });
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

                                    console.table($scope.orders)
                                    $scope.filterOrdersByDate = function () {
                                        $scope.filteredOrders = $scope.orders.filter(function (od) {
                                            var orderDate = new Date(od.createAt);
                                            var startDate = new Date($scope.startDate);
                                            var endDate = new Date($scope.endDate);

                                            return orderDate >= startDate && orderDate <= endDate;
                                        });
                                    };
                                    $scope.selectedStatus = '';

                                    // Hàm để lọc danh sách đơn hàng dựa trên trạng thái được chọn
                                    $scope.filterOrdersByStatus = function () {
                                        $scope.filteredOrders = $scope.orders.filter(function (order) {
                                            return order.status === $scope.selectedStatus;
                                        });
                                    };

                                    $scope.onStatusChange = function () {
                                        console.log('onStatusChange')
                                        $scope.filterOrdersByStatus();
                                    };

                                    // Khởi tạo filteredOrders ban đầu bằng toàn bộ danh sách orders
                                    $scope.filteredOrders = $scope.orders;
                                    $http({
                                        method: "GET",
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("accessToken"),
                                            "X-Refresh-Token": localStorage.getItem("refreshToken"),
                                        },
                                        url: "http://localhost:8080/api/v1/contact-by-userId",
                                    }).then(
                                        function successCallback(response) {
                                            console.log("success")
                                            $scope.contacts = response.data;
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
                        },
                        function errorCallback(response) {

                            // Xử lý lỗi nếu có
                        }
                    );
                }
            });

        } else {
            Swal.fire({
                title: "Thất bại!",
                text: "Đơn hàng này đã quá 24h và không được hủy đơn",
                icon: "error",
            });
            // Hiển thị thông báo cho người dùng rằng không thể hủy đơn hàng
        }

    }
    function loadDiscounts() {
        return $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/auth/discount",
        }).then(
            function successCallback(response) {
                return response.data;
            },
            function errorCallback(response) {
                throw new Error('Không thể tải dữ liệu discounts.');
            }
        );
    }


}]);