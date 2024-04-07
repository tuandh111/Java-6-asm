app.controller('checkoutController', ['$scope', '$http', function ($scope, $http, $rootScope) {
    var base64String = "data:image/png;base64,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";

    // Lấy phần tử hình ảnh từ DOM
    var imgElement = document.getElementById('image');
    // Thiết lập src của hình ảnh là chuỗi base64
    imgElement.src = base64String;
    const radioBtn = document.getElementById('f-option6');
    const radioButton = document.getElementById('f-option5');
    const image = document.getElementById('image');

    // Thêm sự kiện 'change' cho radio button
    radioBtn.addEventListener('change', function () {
        // Kiểm tra xem radio button đã được chọn hay không
        if (this.checked) {
            // Thay đổi src của thẻ img thành đường dẫn hình ảnh mong muốn
            image.src = base64String;
            // Hiển thị thẻ img
            image.style.display = 'block';

        } else {
            // Nếu radio button không được chọn, ẩn thẻ img
            console.log('Không check')
            image.style.display = 'none';
        }
    });
    radioButton.addEventListener('change', function () {
        // Kiểm tra xem radio button đã được chọn hay không
        if (this.checked) {
            // Thay đổi src của thẻ img thành đường dẫn hình ảnh mong muốn
            // Hiển thị thẻ img
            image.style.display = 'none';

        }
    });


    console.log("this is checkout controller")
    var citis = document.getElementById("city");
    var districts = document.getElementById("district");
    var wards = document.getElementById("ward");
    var Parameter = {
        url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
        method: "GET",
        responseType: "application/json",
    };
    var promise = axios(Parameter);
    promise.then(function (result) {
        renderCity(result.data);

        // Tự động chọn giá trị mặc định
        setCitiDefault("01"); // Thay đổi giá trị này thành ID của tỉnh/thành phố mặc định
        setDistrictDefault("001"); // Thay đổi giá trị này thành ID của quận/huyện mặc định
        setWardDefault("00001"); // Thay đổi giá trị này thành ID của phường/xã mặc định
    });

    function renderCity(data) {
        for (const x of data) {
            citis.options[citis.options.length] = new Option(x.Name, x.Id);
        }
        citis.onchange = function () {
            districts.length = 1;
            wards.length = 1;
            if (this.value != "") {
                const result = data.filter(n => n.Id === this.value);

                for (const k of result[0].Districts) {
                    districts.options[districts.options.length] = new Option(k.Name, k.Id);
                }
            }
        };
        districts.onchange = function () {
            wards.length = 1;
            const dataCity = data.filter((n) => n.Id === citis.value);
            if (this.value != "") {
                const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

                for (const w of dataWards) {
                    wards.options[wards.options.length] = new Option(w.Name, w.Id);
                }
            }
        };
    }

    // Hàm thiết lập giá trị mặc định cho tỉnh/thành phố
    function setCitiDefault(id) {
        citis.value = id;
        citis.dispatchEvent(new Event('change'));
    }

    // Hàm thiết lập giá trị mặc định cho quận/huyện
    function setDistrictDefault(id) {
        districts.value = id;
        districts.dispatchEvent(new Event('change'));
    }

    // Hàm thiết lập giá trị mặc định cho phường/xã
    function setWardDefault(id) {
        wards.value = id;
    }

    $scope.openModelAddress = function () {
        // Gán productId vào $scope để hiển thị trong model
        document.getElementById(String('Rules')).style.display = "block";
    }

    $scope.closeModelAddress = function () {
        document.getElementById(String('Rules')).style.display = "none";
    }

    $scope.openModel = function () {
        console.log('this is open model')
        document.getElementById(String('addressModel')).style.display = "block";
    }

    $scope.closeModel = function () {
        document.getElementById(String('addressModel')).style.display = "none";
    }
    $scope.contactByUserId = {}
    $scope.errorFirstName = false;
    $scope.errorLastName = false;
    $scope.errorEmail = false;
    $scope.errorGender = false;
    $scope.errorBirthday = false;
    $scope.errorCity = false;
    $scope.errorDistrict = false;
    $scope.errorWard = false;
    $scope.errorAddress = false;
    $scope.errorPay = false;
    $scope.errorAddressReceive = false;
    $scope.checkOutCartId = [];
    const storedCartIds = localStorage.getItem('checkCartId');
    const cartIdsArray = storedCartIds.split(',');
    const trimmedCartIdsArray = cartIdsArray.map(id => id.trim());
    const uniqueCartIds = [...new Set(trimmedCartIdsArray)];
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


        loadDiscounts().then(function (discounts) {
            $scope.discounts = discounts;
            $scope.totalAmount = 0;

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
                $scope.totalCartAll = $scope.totalAmount - 150000

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
                    $scope.discountTitle = ''
                    $scope.discount = ''

                }
                $scope.freeShip = '25,000 VNĐ';
                $scope.totalCartAll = $scope.totalAmount + 25000
            } else {

                $scope.discountTitle = ''
                $scope.discount = ''
                $scope.freeShip = '';
                $scope.discount = ''
            }
            console.log('Tổng tiền chiết khấu: ' + $scope.totalAmount);
        }).catch(function (error) {
            console.error(error);
        });

    });
    $http({
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
        },
        url: "http://localhost:8080/api/v1/auth/discount",
    }).then(
        function successCallback(response) {
            $scope.discounts = response.data;
            $scope.isDiscounted = function (productId) {
                for (var i = 0; i < $scope.discounts.length; i++) {
                    if ($scope.discounts[i].product.productId === productId) {
                        return true;
                    }
                }
                return false;
            };
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
        url: "http://localhost:8080/api/v1/contact-by-userId",
    }).then(
        function successCallback(response) {
            $scope.contactByUserId = response.data;
            if ($scope.contactByUserId == '') {
                $scope.getUserWithContactIdNull()
            } else {
                $scope.contactByUserId.forEach(function (item) {
                    console.log('ID:', item.user.id);
                    $scope.firstname = item.user.firstname;
                    $scope.lastname = item.user.lastname;
                    $scope.email = item.user.email;
                    $scope.birthday = item.user.birthDay
                    if (item.user.birthDay) {
                        $scope.birthday = new Date(item.user.birthDay);
                    } else {
                        $scope.birthday = null; // Nếu không có ngày sinh, gán giá trị null hoặc giá trị mặc định khác
                    }
                    console.log("birthday" + $scope.birthday);
                    $scope.gender = item.user.gender
                });
            }
        },
        function errorCallback(response) {
        }
    );

    $scope.getUserWithContactIdNull = function () {

        $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/by-userId",
        }).then(
            function successCallback(response) {
                $scope.contactByUser = response.data;
                console.table(response.data)
                $scope.firstname = $scope.contactByUser.firstname;
                $scope.lastname = $scope.contactByUser.lastname;
                $scope.email = $scope.contactByUser.email;
                $scope.birthday = $scope.contactByUser.birthDay
                if ($scope.contactByUser.birthDay) {
                    $scope.birthday = new Date($scope.contactByUser.birthDay);
                } else {
                    $scope.birthday = null; // Nếu không có ngày sinh, gán giá trị null hoặc giá trị mặc định khác
                }
                $scope.gender = $scope.contactByUser.gender

            },
            function errorCallback(response) {
            }
        );
    }
    $scope.GetupdateUserAndContact = function (contact) {
        localStorage.removeItem('updateContactId');
        localStorage.setItem('updateContactId', contact.contactId);
        $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/contact-by-userId",
        }).then(
            function successCallback(response) {
                $scope.contactByUserId = response.data;
                $scope.contactByUserId.forEach(function (item) {
                    if (contact.contactId == item.contactId) {
                        $scope.phone = item.numberPhone
                        console.log("phone:" + item.addressName);
                        $scope.address = item.addressName;
                        var mangPhanTu = $scope.address.split(',');
                        $scope.firstPart = mangPhanTu[0].trim();
                        var ward = mangPhanTu[1].trim();
                        var district = mangPhanTu[2].trim();
                        var city = mangPhanTu[3].trim();
                        $('#city').find('option').filter(function () {
                            return $(this).text().trim() == city.trim();
                        }).prop('selected', true);
                        $('#city').change();
                        $('#district').find('option').filter(function () {
                            console.log($(this).text() + "-" + city)
                            return $(this).text() == String(district.trim());
                        }).prop('selected', true);
                        $('#district').change();
                        $('#ward').find('option').filter(function () {
                            return $(this).text() === String(ward.trim());
                        }).prop('selected', true);
                        $('#ward').change();
                    }
                });
            },
            function errorCallback(response) {
            }
        );

    }
    $scope.applyAddress = function (contact) {
        $http({
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/contact-by-userId",
        }).then(
            function successCallback(response) {
                $scope.contactByUserId = response.data;
                $scope.filteredContacts = [];
                $scope.contactByUserId.forEach(function (item) {
                    if (contact.contactId == item.contactId) {
                        $scope.filteredContacts.push(item)
                        Swal.fire({
                            title: "Thành công!",
                            text: "Áp dụng địa chỉ giao hàng thành công",
                            icon: "success"
                        });
                    }
                });

            },
            function errorCallback(response) {
            }
        );

    }


    $scope.deleteContactId = function (contact) {
        $http({
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            url: "http://localhost:8080/api/v1/delete-contact-by-contactId/" + contact.contactId,
        }).then(
            function successCallback(response) {
                Swal.fire({
                    title: "Thành công!",
                    text: "Xóa địa chỉ thành công",
                    icon: "success"
                });
                $http({
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },
                    url: "http://localhost:8080/api/v1/contact-by-userId",
                }).then(
                    function successCallback(response) {
                        $scope.contactByUserId = response.data;
                        if ($scope.contactByUserId == '') {
                            $scope.getUserWithContactIdNull()
                        } else {
                            $scope.contactByUserId.forEach(function (item) {
                                console.log('ID:', item.user.id);
                                $scope.firstname = item.user.firstname;
                                $scope.lastname = item.user.lastname;
                                $scope.email = item.user.email;
                                $scope.birthday = item.user.birthDay
                                if (item.user.birthDay) {
                                    $scope.birthday = new Date(item.user.birthDay);
                                } else {
                                    $scope.birthday = null; // Nếu không có ngày sinh, gán giá trị null hoặc giá trị mặc định khác
                                }
                                console.log("birthday" + $scope.birthday);
                                $scope.gender = item.user.gender
                            });
                        }
                        $scope.filteredContacts = [];
                        $scope.contactByUserId.forEach(function (item) {
                            if (contact.contactId == item.contactId) {
                                $scope.filteredContacts.push(item)
                            }
                        });
                    },
                    function errorCallback(response) {
                    }
                );

            },
            function errorCallback(response) {
            }
        );

    }

    $scope.addContact = function () {
        if ($scope.firstname == null || $scope.firstname === undefined || $scope.firstname === '') {
            $scope.errorFirstName = true;
            return;
        } else {
            $scope.errorFirstName = false;
        }
        if ($scope.lastname == null || $scope.lastname === undefined || $scope.lastname === '') {
            $scope.errorLastName = true;
            return;
        } else {
            $scope.errorLastName = false;
        }
        if ($scope.phone == null || $scope.phone === undefined || $scope.phone === '') {
            $scope.errorPhone = true;
            return;
        } else {
            $scope.errorPhone = false;
        }
        if (!$scope.validatePhoneNumber($scope.phone)) {
            $scope.errorPhoneCheck = true;
            return;
        } else {
            $scope.errorPhoneCheck = false;
        }
        if ($scope.email == null || $scope.email === undefined || $scope.email === '') {
            $scope.errorEmail = true;
            return;
        } else {
            $scope.errorEmail = false;
        }
        if ($scope.gender == null || $scope.gender === undefined || $scope.gender === '') {
            $scope.errorGender = true;
            return;
        } else {
            $scope.errorGender = false;
        }
        if ($scope.birthday == null || $scope.birthday === undefined || $scope.birthday === '') {
            $scope.errorBirthday = true;
            return;
        } else {
            $scope.errorBirthday = false;
        }
        var city = $('#city').val();
        var district = $('#district').val();
        var ward = $('#ward').val();
        var address = $('#address').val();
        var phone = $('#phone').val();
        var cityName = findCityName(city);
        var districtName = findDistrictName(district)
        var wardName = findWardName(ward)
        if (phone == '' || phone == undefined) {
            $scope.errorPhone = true;
            return;
        } else {
            $scope.errorPhone = false;
        }
        if (cityName == '' || cityName == 'Chọn tỉnh thành') {
            $scope.errorCity = true;
            return;
        } else {
            $scope.errorCity = false;
        }
        if (districtName == '' || districtName == 'Chọn quận huyện') {
            $scope.errorDistrict = true;
            return;
        } else {
            $scope.errorDistrict = false;
        }
        if (wardName == '' || wardName == 'Chọn phường xã') {
            $scope.errorWard = true;
            return;
        } else {
            $scope.errorWard = false;
        }

        if (address == null || address === undefined || address === '') {
            $scope.errorAddress = true;
            return;
        } else {
            $scope.errorAddress = false;
        }

        var requestData = {
            addressName: address + ', ' + wardName + ', ' + districtName + ', ' + cityName,
            phoneNumber: phone,
        };
        $http({
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            data: JSON.stringify(requestData),
            url: "http://localhost:8080/api/v1/save-contact-by-contactId",
        }).then(
            function successCallback(response) {
                $('#phone').html('')
                $scope.phone = ''
                $('#address').html('')
                Swal.fire({
                    title: "Thành công!",
                    text: "Thêm địa chỉ thành công",
                    icon: "success"
                });
                $http({
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },
                    url: "http://localhost:8080/api/v1/contact-by-userId",
                }).then(
                    function successCallback(response) {
                        $scope.contactByUserId = response.data;
                        $scope.contactByUserId.forEach(function (item) {
                            console.log('ID:', item.user.id);
                            $scope.firstname = item.user.firstname;
                            $scope.lastname = item.user.lastname;
                            $scope.email = item.user.email;
                            $scope.birthday = item.user.birthDay
                            if (item.user.birthDay) {
                                $scope.birthday = new Date(item.user.birthDay);
                            } else {
                                $scope.birthday = null;
                            }
                            console.log("birthday" + $scope.birthday);
                            $scope.gender = item.user.gender
                        });
                    },
                    function errorCallback(response) {
                    }
                );
            },
            function errorCallback(response) {
            }
        );

    }
    $scope.updateContact = function () {

        var contactId = localStorage.getItem('updateContactId');
        console.log("contactId is: " + contactId);

        if (contactId === undefined || contactId === '' || contactId == null) {
            Swal.fire({
                title: "Thất bại!",
                text: "Bạn cần chọn địa chỉ để có thể cập nhật",
                icon: "error"
            });
            return;
        }
        if ($scope.firstname == null || $scope.firstname === undefined || $scope.firstname === '') {
            $scope.errorFirstName = true;
            return;
        } else {
            $scope.errorFirstName = false;
        }
        if ($scope.lastname == null || $scope.lastname === undefined || $scope.lastname === '') {
            $scope.errorLastName = true;
            return;
        } else {
            $scope.errorLastName = false;
        }
        if ($scope.phone == null || $scope.phone === undefined || $scope.phone === '') {
            $scope.errorPhone = true;
            return;
        } else {
            $scope.errorPhone = false;
        }
        if (!$scope.validatePhoneNumber($scope.phone)) {
            $scope.errorPhoneCheck = true;
            return;
        } else {
            $scope.errorPhoneCheck = false;
        }
        if ($scope.email == null || $scope.email === undefined || $scope.email === '') {
            $scope.errorEmail = true;
            return;
        } else {
            $scope.errorEmail = false;
        }
        if ($scope.gender == null || $scope.gender === undefined || $scope.gender === '') {
            $scope.errorGender = true;
            return;
        } else {
            $scope.errorGender = false;
        }
        if ($scope.birthday == null || $scope.birthday === undefined || $scope.birthday === '') {
            $scope.errorBirthday = true;
            return;
        } else {
            $scope.errorBirthday = false;
        }
        var city = $('#city').val();
        var district = $('#district').val();
        var ward = $('#ward').val();
        var address = $('#address').val();
        var phone = $('#phone').val();
        var cityName = findCityName(city);
        var districtName = findDistrictName(district)
        var wardName = findWardName(ward)

        if (cityName == '' || cityName == 'Chọn tỉnh thành') {
            $scope.errorCity = true;
            return;
        } else {
            $scope.errorCity = false;
        }
        if (districtName == '' || districtName == 'Chọn quận huyện') {
            $scope.errorDistrict = true;
            return;
        } else {
            $scope.errorDistrict = false;
        }
        if (wardName == '' || wardName == 'Chọn phường xã') {
            $scope.errorWard = true;
            return;
        } else {
            $scope.errorWard = false;
        }

        if (address == null || address === undefined || address === '') {
            $scope.errorAddress = true;
            return;
        } else {
            $scope.errorAddress = false;
        }

        var requestData = {
            addressName: address + ', ' + wardName + ', ' + districtName + ', ' + cityName,
            phoneNumber: phone,
        };
        $http({
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "X-Refresh-Token": localStorage.getItem("refreshToken"),
            },
            data: JSON.stringify(requestData),
            url: "http://localhost:8080/api/v1/update-contact-by-contactId/" + contactId,
        }).then(
            function successCallback(response) {

                $('#phone').val('')
                $scope.phone = ''
                $('#address').val('')
                Swal.fire({
                    title: "Thành công!",
                    text: "Cập nhật địa chỉ  thành công",
                    icon: "success"
                });
                $http({
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },
                    url: "http://localhost:8080/api/v1/contact-by-userId",
                }).then(
                    function successCallback(response) {
                        $scope.contactByUserId = response.data;
                        $scope.contactByUserId.forEach(function (item) {
                            console.log('ID:', item.contactId);
                            $scope.firstname = item.user.firstname;
                            $scope.lastname = item.user.lastname;
                            $scope.email = item.user.email;
                            $scope.birthday = item.user.birthDay
                            if (item.user.birthDay) {
                                $scope.birthday = new Date(item.user.birthDay);
                            } else {
                                $scope.birthday = null;
                            }
                            console.log("birthday" + $scope.birthday);
                            $scope.gender = item.user.gender
                        });
                        $scope.filteredContacts = [];
                        $scope.contactByUserId.forEach(function (item) {
                            if (contactId == item.contactId) {
                                $scope.filteredContacts.push(item)
                                $scope.$apply();
                            }
                        });
                        localStorage.removeItem('updateContactId');
                    },
                    function errorCallback(response) {
                    }
                );
            },
            function errorCallback(response) {
            }
        );

    }
    $scope.checkOutCart = function () {
        const storedCartIds = localStorage.getItem('checkCartId');
        const cartIdsArray = storedCartIds.split(',');
        const trimmedCartIdsArray = cartIdsArray.map(id => id.trim());
        const uniqueCartIds = [...new Set(trimmedCartIdsArray)];
        var requestData = {
            cartId: uniqueCartIds,
            userId: 4
        };
        if ($scope.selector == null || $scope.selector === undefined || $scope.selector === '') {
            $scope.errorPay = true;
        } else {
            $scope.errorPay = false;
        }
        if ($scope.Receive == null || $scope.Receive === undefined || $scope.Receive === '') {
            $scope.errorAddressReceive = true;
        } else {
            $scope.errorAddressReceive = false;
        }
        Swal.fire({
            title: "Thanh toán đơn hàng",
            text: "Bạn có muốn thanh toán đơn hàng?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Chấp nhận!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http({
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "X-Refresh-Token": localStorage.getItem("refreshToken"),
                    },

                    data: JSON.stringify(requestData),
                    url: "http://localhost:8080/api/v1/check-out-cartId",
                }).then(
                    function successCallback(response) {
                        response.data;
                        localStorage.removeItem("checkCartId");
                        let timerInterval;
                        Swal.fire({
                            title: "Xác nhận đơn hàng!",
                            html: "Đang chờ xác nhận đơn hàng <b></b> milliseconds.",
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                window.location.href = '/index.html#!/shop/confirmation';
                            }
                        });

                    },
                    function errorCallback(response) {
                    }
                );
            }
        });
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
    } function findCityName(cityId) {
        var cityOptions = document.getElementById("city").options;
        for (var i = 0; i < cityOptions.length; i++) {
            if (cityOptions[i].value === cityId) {
                return cityOptions[i].text;
            }
        }
        return "";
    }

    function findDistrictName(districtId) {
        var districtOptions = document.getElementById("district").options;
        for (var i = 0; i < districtOptions.length; i++) {
            if (districtOptions[i].value === districtId) {
                return districtOptions[i].text;
            }
        }
        return "";

    }

    function findWardName(districtId) {
        var districtOptions = document.getElementById("ward").options;
        for (var i = 0; i < districtOptions.length; i++) {
            if (districtOptions[i].value === districtId) {
                return districtOptions[i].text;
            }
        }
        return "";
    }
    $scope.validatePhoneNumber = function (phoneNumber) {
        // Sử dụng regex để kiểm tra định dạng số điện thoại
        var phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    };

}])