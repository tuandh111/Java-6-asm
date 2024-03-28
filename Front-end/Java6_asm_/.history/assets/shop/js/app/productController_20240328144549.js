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
    let url = "http://localhost:8080"
    // let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cnVuMTIyODk0QGdtYWlsLmNvbSIsImlhdCI6MTcxMTA4ODY0NywiZXhwIjoxNzExMTc1MDQ3fQ.5QgVoSX08SBI3GuYZW22dhg3CTrFz9LphMu-fUVaf9U";
    // let header = {
    //     'Authorization': 'Bearer ' + token
    // };

    $scope.listProducts = [];
    $scope.filteredProducts = [];
    $scope.listBrands = [];
    $scope.begin = 0;
    $scope.pageSize = 9;
    $scope.searchProductName = '';

    $scope.getProducts = function () {
        $http.get(url + "/api/v1/auth/twobee/products").then(respone => {
            console.log("success", respone.data);
            $scope.lisstProductsFilter = respone.data;
            $scope.listProducts = $scope.lisstProductsFilter;
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
            $scope.filterByProductName = function () {
                $scope.filteredProducts = $scope.lisstProductsFilter.filter(function (prod) {
                    return prod.product.productName.toLowerCase().includes($scope.searchProductName.toLowerCase());
                });
                $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
                $scope.listProducts = $scope.filteredProducts;
                $rootScope.firtPageProduct();
            };
            $scope.countAllProductInBrand = function (brandName) {
                var count = $scope.lisstProductsFilter.filter(function (prod) {
                    return prod.brandName.toLowerCase().includes(brandName.toLowerCase());
                }).length;
                console.log("Số lượng sản phẩm của " + brandName + " là:", count);
                return count;
            };

            $scope.filterByBrandName = function (brandNameFilter) {
                $scope.filteredProducts = $scope.lisstProductsFilter.filter(function (prod) {
                    return prod.brandName.toLowerCase().includes(brandNameFilter.toLowerCase());
                });
                $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
                $scope.listProducts = $scope.filteredProducts;
                $rootScope.firtPageProduct();
                // alert(brandNameFilter)
            };

        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.getBrands = function () {
        $http.get(url + "/api/v1/auth/twobee/brands").then(
            response => {
                console.log("brands", response.data);
                $scope.listBrands = response.data
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }

    $scope.getBrands();
    $scope.getProducts();

})