let app = angular.module("learningHub", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/home.html",
    })
    $routeProvider.when("/question", {
        templateUrl: "templates/question.html",
    });
    $routeProvider.otherwise({
        redirectTo: "templates/home.html"
    });
});

app
    .controller('LoginControllerHTML', LoginController)   
    .controller('ProductControllerHTML', ProductController);


function LoginController($scope) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.login = function() {
        
    }
}

// danh sách khóa học
function ProductController($scope){

}
