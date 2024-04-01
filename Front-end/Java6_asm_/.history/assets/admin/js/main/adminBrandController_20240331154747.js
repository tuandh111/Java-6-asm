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
                $scope.firtPageProduct = function () {
                    $scope.begin = 0;
                }
                $scope.prevPageProduct = function () {
                    if ($scope.begin > 0) {
                        $scope.begin -= $scope.pageSize;
                    }
                }
                $scope.nextPageProduct = function () {
                    if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
                        $scope.begin += $scope.pageSize;
                    }
                }
                $scope.lastPageProduct = function () {
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