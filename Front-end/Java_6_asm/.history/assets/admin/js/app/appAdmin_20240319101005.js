console.log("home page loaded")
let adminApp = angular.module("adminShopApp", ["ngRoute"]);
let BASE_URL = "http://localhost:8080/";
adminApp.config(function ($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: 'templates/admin/dashbord.html',
            // controller: ProductController
        })
        .when("/admin/login", {
            templateUrl: 'templates/admin/login.html',
        })
        .when("/admin/register", {
            templateUrl: 'templates/admin/register.html',
        })
        .when("/admin/forgot-password", {
            templateUrl: 'templates/admin/forgot-password.html',
        })
        .when("/admin/tables", {
            templateUrl: 'templates/admin/tables.html',
        })
        .when("/admin/charts", {
            templateUrl: "templates/admin/charts.html",
        })
        .when("/admin/cards", {
            templateUrl: "templates/admin/cards.html",
        })
        .when("/admin/buttons", {
            templateUrl: "templates/admin/buttons.html",
        })
        .when("/admin/blank", {
            templateUrl: "templates/admin/blank.html",
        })
        .when("/shop/single-blog", {
            templateUrl: "templates/shop/single-blog.html",
        })
        .when("/shop/single-product", {
            templateUrl: "templates/shop/single-product.html",
        })
        .when("/shop/tracking-order", {
            templateUrl: "templates/shop/tracking-order.html",
        })
        .otherwise({
            redirectTo: "templates/home.html"
        });
});

