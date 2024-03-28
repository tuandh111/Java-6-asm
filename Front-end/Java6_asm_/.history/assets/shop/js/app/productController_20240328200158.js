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
    $scope.listProductsFilter = [];
    $scope.listProducts = [];//để chứa kết quả show lên giao diện
    $scope.filteredProducts = [];
    $scope.listBrands = [];
    $scope.begin = 0;
    $scope.pageSize = 9;
    $scope.searchProductName = '';
    $scope.searchProductPrice = '';
    $scope.selectedBrands = [];
    $scope.selecteColors = [];

    $scope.getProducts = function () {
        $http.get(url + "/api/v1/auth/twobee/products").then(respone => {
            console.log("allproduct", respone.data);
            $scope.listProductsFilter = respone.data;
            $scope.listProducts = $scope.listProductsFilter;
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
    }

    $scope.getBrands = function () {
        $http.get(url + "/api/v1/auth/twobee/brands").then(
            response => {
                //   console.log("brands", response.data);
                $scope.listBrands = response.data
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }

    $scope.getColors = function () {
        $http.get(url + "/api/v1/auth/twobee/colors").then(
            response => {
                $scope.listColors = response.data
                console.log("colors", $scope.listColors);
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }
    $scope.getFiltersProduct = function () {

        $scope.filterByProductName = function () {
            $scope.filteredProducts = $scope.listProductsFilter.filter(function (prod) {
                return prod.product.productName.toLowerCase().includes($scope.searchProductName.toLowerCase());
            });
            $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
            $scope.listProducts = $scope.filteredProducts;
            $rootScope.firtPageProduct();
        };
        $scope.filterByProductPrice = function () {
            if ($scope.searchProductPrice === '') {
                $scope.listProducts = $scope.listProductsFilter;
            } else {
                $scope.filteredProducts = $scope.listProductsFilter.filter(function (prod) {
                    return prod.product.price <= parseFloat($scope.searchProductPrice);
                }).sort(function (prod1, prod2) {
                    return prod2.product.price - prod1.product.price;
                });
                $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
                $scope.listProducts = $scope.filteredProducts;
            }
            $rootScope.firtPageProduct();
        };
        $scope.countAllProductInBrand = function (brandName) {
            var count = $scope.listProductsFilter.filter(function (prod) {
                return prod.brandName.toLowerCase().includes(brandName.toLowerCase());
            }).length;
            return count;
        };
        $scope.toggleBrandFilter = function (brandName) {
            var index = $scope.selectedBrands.indexOf(brandName);
            if (index === -1) {
                $scope.selectedBrands.push(brandName);
            } else {
                $scope.selectedBrands.splice(index, 1);
            }
            if (!$scope.selectedBrands || $scope.selectedBrands.length === 0) {
                $scope.listProducts = $scope.listProductsFilter;
            } else {
                $scope.filterProductsBySelectedBrands();
            }
        }
        $scope.filterProductsBySelectedBrands = function () {
            $scope.filteredProducts = $scope.listProductsFilter.filter(function (prod) {
                return $scope.selectedBrands.includes(prod.brandName);
            });
            $scope.listProducts = $scope.filteredProducts;
            $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
            $rootScope.firtPageProduct();
        }

        $scope.countAllProductInColor = function (colorName) {
            var count = $scope.listProductsFilter.filter(function (prod) {
                return prod.colorName.map(function (color) {
                    return color.toLowerCase()
                }).includes(colorName.toLowerCase());
            }).length;
            return count;
        };
        $scope.toggleColorFilter = function (colorName) {
            var index = $scope.selecteColors.indexOf(colorName);
            if (index === -1) {
                $scope.selecteColors.push(colorName);
            } else {
                $scope.selecteColors.splice(index, 1);
            }
            if (!$scope.selecteColors || $scope.selecteColors.length === 0) {
                $scope.listProducts = $scope.listProductsFilter;
            } else {
                $scope.filterProductsBySelectedColors();
            }
        }
        $scope.filterProductsBySelectedColors = function () {
            $scope.filteredProducts = $scope.listProductsFilter.filter(function (prod) {
                return prod.colorName.some(function (color) { return $scope.selecteColors.includes(color) })
            });
            $scope.listProducts = $scope.filteredProducts;
            $scope.pageCount = Math.ceil($scope.filteredProducts.length / $scope.pageSize);
            $rootScope.firtPageProduct();
        }
        $scope.redirectToSingleProduct = function (productId) {
            // $location.path('/shop/single-product/' + productId);
            alert(productId)
        };
    }


    $scope.getBrands();
    $scope.getColors();
    $scope.getProducts();
    $scope.getFiltersProduct();

})