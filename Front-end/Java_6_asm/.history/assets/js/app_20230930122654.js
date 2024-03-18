let quizTesting = angular.module("quizTestingHTML", []);

quizTesting
    .controller("quizControllerHTML", quizController)
    

function quizController($scope) {
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



