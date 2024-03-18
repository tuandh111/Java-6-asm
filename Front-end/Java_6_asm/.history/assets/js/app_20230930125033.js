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
    // let optionsForFirstQuiz = $scope.quizs[0].options;
    // let optionsForSecondQuiz = $scope.quizs[1].options;
    // let optionsForThirdQuiz = $scope.quizs[2].options;

    // $scope.currentQuestionIndex = 0;
    // $scope.selectedOption = null;
    // $scope.showResult = false;
    // $scope.selectedOptions = [];

    // $scope.currentQuestion = function() {
    //     return $scope.quizs[$scope.currentQuestionIndex];
    // };

    // $scope.nextQuestion = function() {
    //     if ($scope.selectedOption !== null) {
    //         $scope.selectedOptions.push($scope.selectedOption);
    //         $scope.selectedOption = null;

    //         if ($scope.currentQuestionIndex < $scope.quizs.length - 1) {
    //             $scope.currentQuestionIndex++;
    //         } else {
    //             $scope.showResult = true;
    //         }
    //     }
    // };
}



