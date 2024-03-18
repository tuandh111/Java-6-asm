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
    .controller('RegisterControllerHTML',RegisterController)
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

function RegisterController($scope,$http){
    $scope.isRegisterSuccess = false;
    $scope.register=function(){
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

function ProductController($scope, $http,$rootScope) {
    $rootScope.listProducts = [];
    $scope.pageCount=0;
    $http({
        method: 'GET',
        url: BASE_URL + 'products'
    }).then(function successCallback(response) {
        $rootScope.listProducts = response.data;
        $scope.pageCount=Math.ceil($rootScope.listProducts.length/8);
        $scope.begin=0;
        $scope.first=function() {
            $scope.begin=0;
        }
        $scope.prev=function() {
            if( $scope.begin>0){
                $scope.begin-=8;
            }
        }
        $scope.next=function() {
            if( $scope.begin<($scope.pageCount-1)*8){
                $scope.begin+=8;
            }
        }
        $scope.last=function() {
            $scope.begin=($scope.pageCount-1)*8
        }
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
}
//End: Danh sách khóa học

//Bảng câu hỏi
function QuestionController($scope, $timeout,$http) {
    $scope.listQuestion = [];
    $http({
        method: 'GET',
        url: BASE_URL + 'questions'
      }).then(function successCallback(response) {
        $scope.listQuestion=response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
}
//End: Question

//detailCourse
function detailController($scope, $routeParams,$rootScope) {
    //console.log($routeParams.id)
    $rootScope.listProducts.forEach(element => {
        if (element.id == $routeParams.id) {
            $scope.title = element.title;
            $scope.image = element.image;
            $scope.textDescription = element.textDescription;
        }
    });
}


