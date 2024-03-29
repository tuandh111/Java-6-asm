console.log('NewArrivalProductAreaController')
app
    .filter('truncateWordsHTML', function () {
        return function (input, limit) {
            if (!input) return '';

            let words = input.split(' ');
            if (words.length <= limit) {
                return input;
            }
            return words.slice(0, limit).join(' ') + '...';
        };
    })
    .filter('formatPrice', function () {
        return function (input) {
            if (!isNaN(input)) {
                var formattedPrice = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return formattedPrice + ' VND';
            } else {
                return input;
            }
        };
    });
app.controller('NewArrivalProductAreaController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080"
    $scope.getNewArrivalProduct = function () {
        $http.get(url + "/api/v1/auth/twobee/products").then(
            response => {
                $scope.listNewArrivalProduct = response.data
                console.log("listNewArrivalProduct", $scope.listNewArrivalProduct);
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }
    $scope.getFiltersProduct = function () {
        $scope.redirectToSingleProduct = function (productId) {
            $location.path('/shop/single-product/' + productId);
        };
    }

    $scope.getNewArrivalProduct();
    $scope.getFiltersProduct();
})