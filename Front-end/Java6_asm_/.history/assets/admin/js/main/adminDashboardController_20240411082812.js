
app.controller('AdminDashboardController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080/api/v1"
    let headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
    }
    console.log("token ", localStorage.getItem("accessToken"));
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
        $http.get(url + "/auth/twobee/products").then(respone => {
            $scope.listProductsFilter = respone.data;
            // $scope.listProducts = $scope.listProductsFilter;
        }).catch(err => {
            console.log("error", err);
        })
    }

    $scope.getAllBrand = function () {
        $http.get(url + "/management/twobee/brands-and-count-product", { headers: headers }).then(
            response => {
                $scope.listBrandsFilter = response.data
                $scope.listBrandsShow = $scope.listBrandsFilter
                //console.log("$scope.listBrandsShow ", $scope.listBrandsShow);
                $scope.pageCount = Math.ceil($scope.listBrandsShow.length / $scope.pageSize);
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
            //console.log("dataProductId", dataProductId);
            $scope.filteredProducts = $scope.listProductsFilter.filter(prod => dataProductId.includes(prod.product.productId))
            //console.log(" $scope.filteredProducts", $scope.filteredProducts)
            $rootScope.listProductsFilterByProductId = $scope.filteredProducts
        }
    }

    $scope.crudBrand = function () {
        $scope.formBrand = {
            nameBrand: "",
            isActive: false
        };
        $scope.editBrand = function (brand) {
            $scope.formBrand = brand.brand
            const triggerFirstTabEl = document.querySelector('#manageBrands li:first-child button')
            bootstrap.Tab.getInstance(triggerFirstTabEl).show()
            const focusInput = document.querySelector('#manageBrandsModalBrandsName')
            focusInput.focus();

        }
        $scope.resetForm = function () {
            $scope.formBrand = {
                nameBrand: "",
                isActive: false
            };
        }
        $scope.createBrand = function () {
            var requsetBrandJSON = angular.toJson($scope.formBrand)
            $http.post(url + "/management/twobee/brands", requsetBrandJSON, { headers: headers }).then(
                respone => {
                    Swal.fire({
                        title: "Thành công!",
                        html: "Đã thêm danh mục  <b>" + respone.data.nameBrand + " </b> thành công!",
                        icon: "success"
                    }).then(rs => {
                        if (rs.isConfirmed) {
                            $scope.resetForm();
                            $scope.getAllBrand();
                            const triggerSecondTabEl = document.querySelector('#manageBrands li:nth-child(2) button');
                            new bootstrap.Tab(triggerSecondTabEl).show()
                        }
                    })
                }
            ).catch(
                err => {
                    console.log("Error during post request for Brand", err)
                    Swal.fire({
                        title: "Thất bại",
                        html: "<b>" + err.data + "</b>",
                        icon: "error"
                    })
                }
            )
        }
        $scope.updateBrand = function () {
            var requsetBrandJSON = angular.toJson($scope.formBrand)
            var brandId = $scope.formBrand.brandId === undefined ? -1 : $scope.formBrand.brandId;
            $http.put(url + "/management/twobee/brands/" + brandId, requsetBrandJSON, { headers: headers }).then(
                respone => {
                    console.log("respone", respone.data);
                    $scope.resetForm();
                    Swal.fire({
                        title: "Thành công!",
                        html: "Đã cập nhật danh mục thành <b>" + respone.data.nameBrand + " </b> thành công!",
                        icon: "success"
                    }).then(rs => {
                        if (rs.isConfirmed) {
                            const triggerSecondTabEl = document.querySelector('#manageBrands li:nth-child(2) button');
                            new bootstrap.Tab(triggerSecondTabEl).show()
                        }
                    })
                }
            ).catch(
                err => {
                    console.log("Error during post request for Brand", err)
                    Swal.fire({
                        title: "Thất bại",
                        html: "<b>" + err.data + "</b>",
                        icon: "error"
                    })
                }
            )
        }
        $scope.deleteBrand = function () {
            var brandId = $scope.formBrand.brandId === undefined ? -1 : $scope.formBrand.brandId;
            Swal.fire({
                text: "Bạn có muốn xóa danh mục ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Trở lại',
                confirmButtonText: 'Có'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http.delete(url + "/management/twobee/brands/" + brandId, { headers: headers }).then(
                        respone => {
                            $scope.resetForm();
                            Swal.fire({
                                title: "Thành công!",
                                html: "Đã xóa danh mục <b>" + respone.data.nameBrand + " </b> thành công!",
                                icon: "success"
                            }).then(rs => {
                                if (rs.isConfirmed) {
                                    $scope.getAllBrand();
                                    const triggerSecondTabEl = document.querySelector('#manageBrands li:nth-child(2) button');
                                    new bootstrap.Tab(triggerSecondTabEl).show()
                                }
                            })
                        }
                    ).catch(
                        err => {
                            console.log("Error during post request for Brand", err)
                            Swal.fire({
                                title: "Thất bại",
                                html: "<b>" + err.data + "</b>",
                                icon: "error"
                            })
                        }
                    )
                }
            })
        }
        $scope.deleteBrandById = function (brand) {
            var idBrand = brand.brand.brandId
            var brandName = brand.brand.nameBrand
            Swal.fire({
                html: "Bạn có muốn xóa danh mục <b>" + brandName + "</b> ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Trở lại',
                confirmButtonText: 'Có'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http.delete(url + "/management/twobee/brands/" + idBrand, { headers: headers }).then(
                        respone => {
                            $scope.resetForm();
                            Swal.fire({
                                title: "Thành công!",
                                html: "Đã xóa danh mục <b>" + respone.data.nameBrand + " </b> thành công!",
                                icon: "success"
                            }).then(rs => {
                                if (rs.isConfirmed) {
                                    $scope.getAllBrand();
                                    const triggerSecondTabEl = document.querySelector('#manageBrands li:nth-child(2) button');
                                    new bootstrap.Tab(triggerSecondTabEl).show()
                                }
                            })
                        }
                    ).catch(
                        err => {
                            console.log("Error during post request for Brand", err)
                            Swal.fire({
                                title: "Thất bại",
                                html: "<b>" + err.data + "</b>",
                                icon: "error"
                            })
                        }
                    )
                }
            })
        }

    }

    $scope.getAllBrand();
    $scope.filterBrand();
    $scope.getProducts();
    $scope.crudBrand();
})

