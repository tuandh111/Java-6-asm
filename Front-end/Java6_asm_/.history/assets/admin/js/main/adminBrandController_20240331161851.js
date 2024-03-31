console.log('adminBrandController')
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
app.controller('AdminBrandController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080"

    $scope.listBrandsFilter = [];
    $scope.listBrandsShow = [];//để chứa kết quả show lên giao diện
    $scope.filteredBrands = [];
    $scope.begin = 0;
    $scope.pageSize = 4;
    $scope.searchBrandsName = '';

    $scope.getAllBrand = function () {
        $http.get(url + "/api/v1/auth/twobee/brands-and-count-product").then(
            response => {
                $scope.listBrandsFilter = response.data
                $scope.listBrandsShow = $scope.listBrandsFilter
                console.log("listBrands", $scope.listBrandsShow);

                $scope.pageCount = Math.ceil($scope.listBrandsShow.length / $scope.pageSize);

                console.log("$scope.pageCount", $scope.pageCount);
                $scope.firtPage = function () {
                    $scope.begin = 0;
                }
                $scope.prevPage = function () {
                    if ($scope.begin > 0) {
                        $scope.begin -= $scope.pageSize;
                    }
                }
                $scope.nextPage = function () {
                    if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                        $scope.begin += $scope.pageSize;
                    }
                }
                $scope.lastPage = function () {
                    $scope.begin = ($scope.pageCount - 1) * $scope.pageSize
                }
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }

    $scope.filterBrand = function () {
        $scope.filterByBrandsName = function () {
            $scope.filteredBrands = $scope.listBrandsFilter.filter(function (brand) {
                return brand.brand.nameBrand.toLowerCase().includes($scope.searchBrandsName.toLowerCase())
            })

            $scope.pageCount = Math.ceil($scope.filteredBrands.length / $scope.pageSize);
            $scope.listBrandsShow = $scope.filteredBrands;
            $scope.firtPage();
        }

        $scope.detailProductInBrand = function () {
            $(".open-detail-brand").click(function () {
                alert("Product")
            })
        }
    }

    $scope.getAllBrand();
    $scope.filterBrand();
})