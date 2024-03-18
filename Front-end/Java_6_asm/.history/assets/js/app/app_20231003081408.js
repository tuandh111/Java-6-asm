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

app.controller("confirmModelControllerHTML", confirmModelControllerHTML);

function confirmModelControllerHTML($scope) {
    $scope.acceptAndRedirect = function () {
        window.location.href = "login.html";
        angular.element('#confirmTest').modal('hide');
    }
} 