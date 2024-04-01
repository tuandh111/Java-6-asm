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
    $scope.pageSize = 5;
    $scope.searchBrandsName = '';

    $scope.getAllBrand = function () {
        $http.get(url + "/api/v1/auth/twobee/brands").then(
            response => {
                $scope.listBrandsFilter = response.data
                $scope.listBrandsShow = $scope.listBrandsFilter
                console.log("listBrands", $scope.listBrands);

                $scope.pageCount = Math.ceil($scope.listBrandsShow.length / $scope.pageSize);
                $rootScope.firtPageBrand = function () {
                    $scope.begin = 0;
                }
                $rootScope.prevPageBrand = function () {
                    if ($scope.begin > 0) {
                        $scope.begin -= $scope.pageSize;
                    }
                }
                $rootScope.nextPageBrand = function () {
                    if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                        $scope.begin += $scope.pageSize;
                    }
                }
                $rootScope.lastPageBrand = function () {
                    $scope.begin = ($scope.pageCount - 1) * $scope.pageSize
                }
            }
        ).catch(
            err => { console.log("error", err); }
        )
    }

    $scope.filterBrand = function () {
        $scope.filterByBrandsName = function () {

        }
    }

    $scope.getAllBrand();
})