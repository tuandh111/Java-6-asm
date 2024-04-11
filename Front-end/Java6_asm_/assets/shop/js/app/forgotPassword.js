
app.controller('forgotPasswordController', ['$scope', '$http', function ($scope, $http) {
    $scope.submitForgotPassword = function () {
        $scope.email;
        $http({
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },

            url: "http://localhost:8080/api/v1/auth/forgot-password/" + $scope.email
        }).then(function (response) {
            $scope.user = response.data;
            console.log($scope.user)
            handleRegistrationResponse(response.data)


        });
    }
    function handleRegistrationResponse(response) {
        var json = response;
        var verifyCode1 = json.verify;
        var message = json.message
        var userID = json.userID
        if (message == 'success') {
            Swal.fire({
                title: 'Xác thực tài khoản',
                html: `<form action="/verify-code" method="post">
                        <input type="text" id="verificationCode" name="confirmPassword1" class="swal2-input" placeholder="Nhập mã xác nhận email" />
                        <input type="password" id="password" name="confirmPassword1" class="swal2-input" placeholder="Nhập mật khẩu mới" />
                        <input type="passoword" id="confirmPassword" name="confirmPassword1" class="swal2-input" placeholder="Nhập lại mật khẩu" />
                    </form>`,
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve, reject) {
                        const verificationCode = $("#verificationCode").val();
                        console.log(verificationCode);
                        if (verificationCode === verifyCode1) {

                            const password = $("#password").val();
                            const confirmPassword = $("#confirmPassword").val();
                            if (password === confirmPassword) {
                                var requestData = {
                                    email: $scope.email,
                                    password: password
                                };
                                $http({
                                    method: "POST",
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                                    },
                                    data: JSON.stringify(requestData),
                                    url: "http://localhost:8080/api/v1/auth/update-password"
                                }).then(function (response) {
                                    Swal.fire({
                                        title: "Thành công!",
                                        text: "Thay đổi mật khẩu thành công",
                                        icon: "success"
                                    });

                                    window.location.href = '#!/shop/login';


                                });
                            } else {
                                Swal.fire({
                                    title: "Thành công!",
                                    text: "Nhập lại mật khẩu không chính xác",
                                    icon: "success"
                                });
                            }

                        } else {
                            reject();
                            console.log("loi")
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: "Xác nhận tài khoản không thành công",
                                showConfirmButton: true,
                                timer: 1500
                            }).then(function () {
                                // Redirect to the home page
                                window.location.href = '#!/shop/register'; // Change '/home' to the actual URL of your home page
                            });
                        }
                    });
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function (result) {

            });
        } else if (response === 'fail') {
            Swal.fire({
                icon: 'error', title: 'Lỗi', text: "Có lỗi xảy ra", showConfirmButton: true, timer: 3500
            })
        } else if (message === 'errorEmail') {
            Swal.fire({
                icon: 'error', title: 'Lỗi', text: "Email không tồn tại", showConfirmButton: true, timer: 3500
            })

        }
    }
}]);