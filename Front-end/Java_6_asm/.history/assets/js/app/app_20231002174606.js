let app=angular.module("learningHub",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"templates/home.html",
    });
});