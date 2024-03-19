console.log("home page loaded")
let adminApp = angular.module("adminShopApp", ["ngRoute"]);
let BASE_URL = "http://localhost:8080/";
adminApp.config(function ($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: 'templates/admin/dashbord.html',
            // controller: ProductController
        })
        .when("/shop/login", {
            templateUrl: 'templates/shop/login.html',
        })
        .when("/shop/register", {
            templateUrl: 'templates/shop/register.html',
        })
        .when("/shop/contact", {
            templateUrl: 'templates/shop/contact.html',
        })
        .when("/shop/cart", {
            templateUrl: 'templates/shop/cart.html',
        })
        .when("/shop/blog", {
            templateUrl: "templates/shop/blog.html",
        })
        .when("/shop/category", {
            templateUrl: "templates/shop/category.html",
        })
        .when("/shop/checkout", {
            templateUrl: "templates/shop/checkout.html",
        })
        .when("/shop/confirmation", {
            templateUrl: "templates/shop/confirmation.html",
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

