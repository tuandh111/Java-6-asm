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
}]);

