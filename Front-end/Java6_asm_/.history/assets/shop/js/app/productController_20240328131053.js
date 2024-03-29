console.log('ProductController')
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
app.controller('ProductController', function ($scope, $http, $rootScope) {
    let url = "http://localhost:8080/api/v1/auth/twobee/products"
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cnVuMTIyODk0QGdtYWlsLmNvbSIsImlhdCI6MTcxMTA4ODY0NywiZXhwIjoxNzExMTc1MDQ3fQ.5QgVoSX08SBI3GuYZW22dhg3CTrFz9LphMu-fUVaf9U";
    let header = {
        'Authorization': 'Bearer ' + token
    };
    // , { headers: header }
    $scope.listProducts = [];
    $scope.filteredProducts = [];
    $scope.begin = 0;
    $scope.pageSize = 9;
    $scope.searchProductName = '';

    $scope.filterByProductName = function () {
        $scope.filteredProducts = $scope.listProducts.filter(function (product) {
            return product.productName.toLowerCase().includes($scope.searchProductName.toLowerCase());
        });
        $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
        $scope.listProducts = $scope.filteredProducts;
        $rootScope.firtPageProduct();
        // alert($scope.searchProductName)
    };
    // , { headers: header }
    $http.get(url).then(respone => {
        console.log("success", respone.data);
        $scope.listProducts = respone.data;
        $scope.pageCount = Math.ceil($scope.listProducts.length / $scope.pageSize);
        $rootScope.firtPageProduct = function () {
            $scope.begin = 0;
        }
        $rootScope.prevPageProduct = function () {
            if ($scope.begin > 0) {
                $scope.begin -= $scope.pageSize;
            }
        }
        $rootScope.nextPageProduct = function () {
            if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                $scope.begin += $scope.pageSize;
            }
        }
        $rootScope.lastPageProduct = function () {
            $scope.begin = ($scope.pageCount - 1) * $scope.pageSize
        }
    }).catch(err => {
        console.log("error", err);
    })

})