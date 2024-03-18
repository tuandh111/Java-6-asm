let lab4appJs = angular.module("lab4appHTML", []);

lab4appJs
    .controller("profileController", profileController)
    .controller("profileControllerObjectHTML", profileControllerObject)
    .controller("caculateControllerHTML", caculateController)
    .controller("achievementControllerHTML", achievementController)
    .controller("profileTableControllerObjectHTML", profileTableControllerObject);

function profileController($scope) {
    $scope.fullname = "Nguyễn Thành Trung";
    $scope.birthday = "01-01-1999";
    $scope.gender = "Nam";
    $scope.mark = "9.8";
}

function profileControllerObject($scope) {
    let student = {
        fullname: "Nguyễn Văn A",
        birthday: "01-01-1999",
        gender: "Nam",
        mark: 10
    };
    $scope.student_obj = student;
}

function profileTableControllerObject($scope) {
    $scope.students = [
        {
            fullname: "Nguyễn Thành Trung",
            birthday: "01-01-1999",
            gender: "Nam",
            mark: 10,
            image: "assets/images/trung.jpg"
        },
        {
            fullname: "Đỗ Tấn Tài",
            birthday: "01-01-2004",
            gender: "Nam",
            mark: 9,
            image: "assets/images/soc.jpg"
        },
        {
            fullname: "Nguyễn Thị Trường",
            birthday: "01-01-2005",
            gender: "Nữ",
            mark: 7,
            image: "assets/images/pikachu5.jpg"
        }

    ]

}

function caculateController($scope) {
    $scope.length = 0;
    $scope.width = 0;
    $scope.acreage = 0;
    $scope.perimeter = 0;
    $scope.errorMessage = '';
    $scope.calculate = function () {
        let length = parseFloat($scope.length);
        let width = parseFloat($scope.width);
        if (isNaN(length) || isNaN(width) || length < 0 || width < 0) {
            $scope.errorMessage = 'Vui lòng nhập các số dương hợp lệ.';
            return;
        }
        $scope.acreage = length * width;
        $scope.perimeter = (length + width) * 2;
        $scope.errorMessage = 'Phép tính thực hiện thành công!';
    }
}

function achievementController($scope) {
    $scope.fullname = "Nguyễn Thành Trung";
    $scope.birdthday = "";
    $scope.gender = "Nam";
    $scope.score = "10";
    $scope.result = "";
    $scope.checkGender = "";
    $scope.achievementCal = function () {
        let fullname = $scope.fullname;
        let gender = $scope.gender;
        let score = parseFloat($scope.score);
        if (isNaN(score) || score < 0 || score > 10) {
            $scope.result = 'Điểm không hợp lệ.';
            return;
        }
        if (score < 5) {
            $scope.achievement = "Rớt";
        } else (
            $scope.achievement = "Đậu"
        );
        if ($scope.gender == "Nam") {
            $scope.checkGender = "Anh ";
        } else {
            $scope.checkGender = "Chị ";
        }
        $scope.result = "Kết quả của " + $scope.checkGender + fullname + " là " + $scope.achievement;
    }
}

