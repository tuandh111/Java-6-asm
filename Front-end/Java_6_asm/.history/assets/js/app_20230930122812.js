let quizTesting = angular.module("quizTestingHTML", []);

quizTesting
    .controller("quizControllerHTML", quizController)


function quizController($scope) {
    $scope.quizs = [
        {
            question: "Bạn Tên là gì?",
            options: ["Nguyễn Thành Trung", "Lê Văn Minh", "Trịnh Thị Nhì", "Nguyễn Thị Hồng"],
            correctAnswer: "Nguyễn Thành Trung"
        },
        {
            question: "Bạn đang học trường gì?",
            options: ["FPT Polytechnic Cần Thơ", "Đại học Cần Thơ", "Đại học Tây Đô", "Đại học Nam Cần Thơ"],
            correctAnswer: "FPT Polytechnic Cần Thơ"
        },
        {
            question: "Mã số sinh viên của Bạn là?",
            options: ["PC05677", "PC05467", "PC09125", "PC05132"],
            correctAnswer: "PC05132"
        }

    ]

}



