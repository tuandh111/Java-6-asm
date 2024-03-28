console.log('topProductAreaController')
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
app.controller('TopProductController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080"
    $scope.getTopProduct = function () {
        $http.get(url + "/api/v1/auth/twobee/top-products").then(
            response => {
                $scope.listTopProduct = response.data
                console.log("TopProduct", $scope.listTopProduct);
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }

    $scope.getTopProduct();
})