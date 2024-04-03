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

    $scope.listProductsFilter = [];
    $rootScope.listProductsFilterByProductId = [];//để chứa kết quả show lên giao diện
    $scope.filteredProducts = [];


    $scope.getProducts = function () {
        $http.get(url + "/api/v1/auth/twobee/products").then(respone => {
            console.log("admin-allproduct", respone.data);
            $scope.listProductsFilter = respone.data;
            $scope.listProducts = $scope.listProductsFilter;
        }).catch(err => {
            console.log("error", err);
        })
    }
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

        $scope.filterProductByProductId = function (dataProductId) {
            console.log("dataProductId", dataProductId);
            $scope.filteredProducts = $scope.listProductsFilter.filter(prod => dataProductId.includes(prod.product.productId))
            console.log(" $scope.filteredProducts", $scope.filteredProducts)
            $rootScope.listProductsFilterByProductId = $scope.filteredProducts
        }
    }

    $scope.crudBrand = function () {
        $scope.formBrand = {
            nameBrand: "",
            isActive: false // Gán giá trị mặc định là false khi không được xác định
        };
        $scope.editBrand = function (brand) {
            $scope.formBrand = brand.brand
            //chọn tab đầu tiên
            const triggerFirstTabEl = document.querySelector('#manageBrands li:first-child button')
            bootstrap.Tab.getInstance(triggerFirstTabEl).show()

            const focusInput = document.querySelector('#manageBrandsModalBrandsName')
            focusInput.focus();
        }

        $scope.resetForm = function () {
            $scope.formBrand = {};
        }
        $scope.createBrand = function () {
            var requsetBrandJSON = angular.toJson(angular.copy($scope.formBrand));
            $http.post(url + "/api/v1/auth/twobee/brands", requsetBrandJSON).then(
                respone => {
                    var data = respone.data
                    console.log("data", data);
                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm danh mục " + data.nameBrand + " thành công!",
                        icon: "success"
                    });
                    $scope.resetForm();
                    $scope.listBrandsFilter.push(data);
                    const triggerSecondTabEl = document.querySelector('#manageBrands li:nth-child(2) button');
                    bootstrap.Tab.getInstance(triggerSecondTabEl).show();
                }
            ).catch(err => console.log("Error during post request for Brand", err))
        }

    }

    $scope.getAllBrand();
    $scope.filterBrand();
    $scope.getProducts();
    $scope.crudBrand();
})