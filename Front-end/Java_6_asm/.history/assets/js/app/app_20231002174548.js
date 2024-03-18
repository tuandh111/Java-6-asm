let app=angular.module("learningHub",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/home",{
        templateUrl:"templates/home.html",
    });
});