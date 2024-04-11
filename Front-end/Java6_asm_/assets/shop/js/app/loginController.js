app.controller('SignInController', ['$scope', '$http', function ($scope, $http) {


    $scope.signIn = function () {
        console.log('Login');
        $scope.checkInputFields();
        if (!$scope.email || !$scope.password) {
            return;
        }
        console.log($scope.email + $scope.password);
        var requestData = {
            email: $scope.email,
            password: $scope.password
        };

        $http.post('http://localhost:8080/api/v1/auth/authenticate', requestData)
            .then(function (response) {
                try {
                    var dataResponse = response.data;
                    console.log(dataResponse)
                    if (dataResponse.access_token && dataResponse.refresh_token) {
                        localStorage.setItem('accessToken', dataResponse.access_token);
                        localStorage.setItem('refreshToken', dataResponse.refresh_token);
                        console.log("mới" + localStorage.getItem("accessToken"))
                        Swal.fire({
                            title: "Thành công!",
                            text: "Đăng nhập thành công!",
                            icon: "success"
                        }).then(function () {
                            window.location.href = '/index.html#!';
                        });
                        $scope.loadData();


                        console.log('Login successful');
                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: "Dữ liệu trả về từ server không hợp lệ!",
                            icon: "error"
                        });
                        console.error('Invalid data from server');
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Đã xảy ra lỗi khi xử lý dữ liệu từ server!",
                        icon: "error"
                    });
                    console.error('Error:', error);
                }
            })
            .catch(function (error) {
                Swal.fire({
                    title: "Lỗi!",
                    text: "Đăng nhập không thành công. Vui lòng thử lại!",
                    icon: "error"
                });
                console.error('Error:', error);
            });
    };
    $scope.checkInputFields = function () {
        if (!$scope.email) {
            $scope.emailError = true;
        } else {
            $scope.emailError = false;
        }
        if (!$scope.password) {
            $scope.passwordError = true;
        } else {
            $scope.passwordError = false;
        }
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


}]);

