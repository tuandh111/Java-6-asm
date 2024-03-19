console.log("home page loaded")
let app = angular.module("shoesHub", ["ngRoute"]);
let BASE_URL = "http://localhost:8080/";
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'templates/shop/homepage.html',
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
            redirectTo: "templates/shop/homepage.html"
        });
});

