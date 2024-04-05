app.controller('checkoutController', ['$scope', '$http', function ($scope, $http) {
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


    var requestData = {
        cartId: ["1dsfsdfsdf", "1dsfsd", "5abcs"],
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
        console.table($scope.checkOutCartId)
    });
}])