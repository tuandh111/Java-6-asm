let app = angular.module("learningHub", ["ngRoute"]);
let BASE_URL = "http://localhost:3000/";
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html",
            controller: ProductController
        })
        .when("/contact", {
            templateUrl: "templates/contact.html",
        })
        .when("/about", {
            templateUrl: "templates/about.html",
        })
        .when("/blog", {
            templateUrl: "templates/blog.html",
        })
        .when("/question/:id", {
            templateUrl: "templates/question.html",
            controller: QuestionController
        })

        .when("/detailCourse/:id", {
            templateUrl: "templates/detailCourse.html",
            controller: detailController
        })
        .otherwise({
            redirectTo: "templates/home.html"
        });
});

app
    .controller('LoginControllerHTML', LoginController)
    .controller('RegisterControllerHTML', RegisterController)
    .controller('ProductControllerHTML', ProductController)
    .controller('QuestionControllerHTML', QuestionController);

app.filter('truncateWordsHTML', function () {
    return function (input, limit) {
        if (!input) return '';

        let words = input.split(' ');
        if (words.length <= limit) {
            return input;
        }
        return words.slice(0, limit).join(' ') + '...';
    };
})


// Start: Đăng nhập    
function LoginController($scope, $rootScope, $http) {
    $rootScope.isLogin = false;
    $scope.listProfiles = [];
    $scope.countLoginFailed = 0;
    $scope.isDisabledLoginButton = false;
    $http({
        method: 'GET',
        url: BASE_URL + 'profiles'
    }).then(function successCallback(response) {
        $scope.listProfiles = response.data;
        $rootScope.login = function () {
            $scope.listProfiles.forEach(element => {
                if (element.username == $scope.user.loginName && element.password == $scope.user.loginPass) {
                    $rootScope.isLogin = true;
                    $rootScope.fullNameSuccess = element.fullname;
                    $rootScope.userMarkSuccess = element.marks;
                    $rootScope.studentInfo=
                }
            });

            if ($rootScope.isLogin == true) {
                $('#loginModal').modal('hide');
            } else {
                $scope.countLoginFailed++;
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: "Bạn còn " + (3 - $scope.countLoginFailed) + " lần đăng nhập",
                });
                if ($scope.countLoginFailed == 3) {
                    $scope.isDisabledLoginButton = true;
                }
            }
        }
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    // $scope.closeLoginModal = function () {
    //     $('#loginModal').modal('hide');
    // }
    // $('loginButton').click(
    //     function () {
    //         if ($rootScope.isLogin) {
    //             $scope.closeLoginModal();
    //         }else{
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Login Failed',
    //                 text: 'Vui lòng kiểm tra lại tài khoản',
    //             });
    //         }
    //     }
    // )
}
//Not complete yet
//End: Đăng nhập

function RegisterController($scope, $http) {
    $scope.isRegisterSuccess = false;
    $scope.listUers = [];
    $http({
        method: 'GET',
        url: BASE_URL + 'profiles'
    }).then(function successCallback(response) {
        $scope.listUers = response.data;
        $scope.register = function () {
            let emailInput = $scope.user.email;
            let usernameInput = $scope.user.username;
            $scope.listUers.forEach(element => {
                if (element.username == usernameInput && element.email == emailInput) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Register Failed',
                        text: "Tên đăng nhập và email đã tồn tại",
                    });
                } else if (element.username == usernameInput) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Register Failed',
                        text: "Tên đăng nhập đã tồn tại",
                    });
                } else if (element.email == emailInput) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Register Failed',
                        text: "Email đã tồn tại",
                    });
                } else {
                    $scope.isRegisterSuccess = true;
                }
            })
            if ($scope.isRegisterSuccess==true) {
                $('#registerModal').modal('hide');
                $http({
                    method: 'POST',
                    url: BASE_URL + 'profiles',
                    data: $scope.user
                }).then(function successCallback(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Register Success',
                        text: "Đăng ký thành công",
                    });                  
                }, function errorCallback(response) {
                });
            }
        }
    }, function errorCallback(response) {
    });
   
}

// Start: danh sách khóa học

function ProductController($scope, $http, $rootScope) {
    $scope.listProducts = [];
    $scope.begin = 0;
    $scope.pageSize = 8;
    $http({
        method: 'GET',
        url: BASE_URL + 'products'
    }).then(function successCallback(response) {
        $scope.listProducts = response.data;
        $scope.pageCount = Math.ceil($scope.listProducts.length / $scope.pageSize);
        $rootScope.firtPageProduct = function () {
            $scope.begin = 0;
        }
        $rootScope.prevPageProduct = function () {
            if ($scope.begin > 0) {
                $scope.begin -= $scope.pageSize;
            }
        }
        $rootScope.nextPageProduct = function () {
            if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                $scope.begin += $scope.pageSize;
            }
        }
        $rootScope.lastPageProduct = function () {
            $scope.begin = ($scope.pageCount - 1) * $scope.pageSize
        }
    }, function errorCallback(response) {
        console.log(response);
    });
}
//End: Danh sách khóa học

//Bảng câu hỏi
function QuestionController($scope, $http, $routeParams, $rootScope) {

    // const timerDisplay = document.getElementById('timer');
    // $scope.countdown = 30;
    // let timeLeft = $scope.countdown;
    // function updateTimer() {
    //     const minutes = Math.floor(timeLeft / 60);
    //     const seconds = timeLeft % 60;
    //     timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    //     if (timeLeft === 0) {
    //         clearInterval(interval);
    //         timerDisplay.innerHTML = "Hết giờ!";
    //         updateResults();
    //     } else {
    //         timeLeft--;
    //     }
    // }
    // updateTimer();
    // const interval = setInterval(updateTimer, 1000);



    $scope.listProducts = [];
    $scope.listQuestion = [];
    let idCourse = $routeParams.id;
    $scope.countQuestion = 1;
    $scope.selectedOption = {};
    $scope.answerId = "";
    let selectedValue = "";
    $scope.totalMark = 0;
    $scope.begin = 0;
    $scope.pageSize = 1;
    $http({
        method: 'GET',
        url: BASE_URL + 'products'
    }).then(function successCallback(response) {
        $scope.listProducts = response.data;
        $scope.listProducts.forEach(element => {
            if (element.id == $routeParams.id) {
                $scope.title = element.title;
            }
        });
    }, function errorCallback(response) {
        console.log(response);
    });

    $http({
        method: 'GET',
        url: BASE_URL + 'questions/' + idCourse
    }).then(function successCallback(response) {
        $scope.listQuestion = response.data.data;
        $scope.pageCount = Math.ceil($scope.listQuestion.length / $scope.pageSize);
        $rootScope.prevQuiz = function () {
            if ($scope.begin > 0) {
                $scope.begin -= $scope.pageSize;
                $scope.countQuestion--;
            }
            $rootScope.result();
        }
        $rootScope.nextQuiz = function () {
            if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                $scope.begin += $scope.pageSize;
                $scope.countQuestion++;

            }
            $rootScope.result();
        }
        $rootScope.radioCheck = function (questionId) {
            selectedValue = $scope.selectedOption[questionId];
            $scope.listQuestion.forEach(element => {
                if (element.id == questionId) {
                    $scope.answerId = element.AnswerId;
                    $scope.mark = element.Marks;
                }
            });
        }
        $rootScope.result = function () {
            if (selectedValue == "") {
                $scope.totalMark += 0;
                console.log($scope.totalMark);
            } else if (selectedValue == $scope.answerId) {
                $scope.totalMark += $scope.mark;
            }
        }
    }, function errorCallback(response) {
        console.log(response);
    });
}
//End: Question

//detailCourse
function detailController($scope, $routeParams, $http) {
    $scope.listProducts = [];
    $http({
        method: 'GET',
        url: BASE_URL + 'products'
    }).then(function successCallback(response) {
        $scope.listProducts = response.data;
        $scope.listProducts.forEach(element => {
            if (element.id == $routeParams.id) {
                $scope.title = element.title;
                $scope.image = element.image;
                $scope.textDescription = element.textDescription;
            }
        });
    }, function errorCallback(response) {
        console.log(response);
    });
}


