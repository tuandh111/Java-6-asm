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
    $http({
        method: 'GET',
        url: BASE_URL + 'profiles'
    }).then(function successCallback(response) {
        $scope.listProfiles = response.data;
        $rootScope.login = function () {
            $scope.listProfiles.forEach(element => {
                if (element.username == $scope.user.loginName && element.password == $scope.user.loginPass) {
                    $rootScope.isLogin = true;
                    $rootScope.userNameSuccess = element.username;
                    $rootScope.userMarkSuccess = element.marks;
                }
            });

            if ($rootScope.isLogin == true) {
                // alert("THÀNH CÔNG");
                // window.location.href="/index.html";
                $('#loginModal').modal('hide');
            } else {
                alert("SAI TÀI KHOẢN");
            }
        }
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

}
//Not complete yet
//End: Đăng nhập

function RegisterController($scope, $http) {
    $scope.isRegisterSuccess = false;
    $scope.register = function () {
        $http({
            method: 'POST',
            url: BASE_URL + 'profiles',
            data: $scope.user
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
}

// Start: danh sách khóa học

function ProductController($scope, $http) {
    $scope.listProducts = [];
    $http({
        method: 'GET',
        url: BASE_URL + 'products'
    }).then(function successCallback(response) {
        $scope.listProducts = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
}
//End: Danh sách khóa học

//Bảng câu hỏi
function QuestionController($scope, $http, $routeParams) {
   

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
    let idCourse=$routeParams.id;
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
        url: BASE_URL + 'questions/'+idCourse
    }).then(function successCallback(response) {
       
        console.log( response.data );
        // $scope.listProducts.forEach(element => {
        //     if (element.id == $routeParams.id) {
        //         $scope.title = element.title;
        //     }
        // });
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


