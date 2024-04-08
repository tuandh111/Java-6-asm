console.log('AdminProductController')

app.controller('AdminProductController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080/api/v1/management/twobee"
    let headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
    }

    $scope.filenames = []
    $scope.infoProductRelative = []
    $scope.listProductSortByCreateDate = []
    // $scope.listProductImg = []
    $scope.selectedBrands = [];
    $scope.selecteColors = [];
    $scope.selecteSizes = [];

    $scope.begin = 0;
    $scope.pageSize = 5;

    $scope.listInfo = function () {
        $http.get(url + '/products', { headers: headers }).then(response => {
            $scope.infoProductRelative = response.data
            console.log("$scope.infoProductRelative", response.data);
            $scope.pageCount = Math.ceil($scope.infoProductRelative.products.length / $scope.pageSize);
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
            $scope.sortListProduct();
            // $scope.ngInitPage = function () {
            //     $scope.infoProductRelative.products.forEach(product => {
            //         $scope.getImageByProduct(product)
            //         $scope.getDiscountByProduct(product)
            //     })
            // }
            // $scope.ngInitPage()
        }).catch(error => {
            console.log("error", error);
        })
    }

    $scope.listImg = function () {
        $http.get(url + '/images', { headers: headers }).then(response => {
            $scope.filenames = response.data
            console.log("$scope.filenames", response.data);
        }).catch(error => {
            console.log("error", error);
        })
    }

    $scope.urlImg = (filename) => {
        return "http://localhost:8080/api/v1/auth/twobee/images/" + filename;
    }

    $scope.deleteImg = (filename) => {
        $http.delete(url + "/images/" + filename, { headers: headers }).then(resp => {
            let i = $scope.filenames.findIndex(name => name == filename);
            $scope.filenames.splice(i, 1);
        }).catch(err => {
            console.log("error", err);
        })
    }
    $scope.uploadImg = (files) => {
        var form = new FormData();
        for (var i = 0; i < files.length; i++) {
            form.append("files", files[i]);
        }
        $http.post(url + "/images", form, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                ...headers
            }
        }).then(response => {
            $scope.filenames.push(...response.data);
        }).catch(err => {
            console.log("error: ", err);
        })
    }

    $scope.sortListProduct = () => {
        console.log("$scope.infoProductRelative okkk", $scope.infoProductRelative);
        $scope.listProductSortByCreateDate = $scope.infoProductRelative.products.sort((prod1, prod2) => {
            return new Date(prod2.createDate) - new Date(prod1.createDate);
            //return prod2.productId - prod1.productId;
        });
        console.log("listProductSortByCreateDate", $scope.listProductSortByCreateDate);
        return $scope.listProductSortByCreateDate
    }

    $scope.getImageByProduct = function (product) {
        let productImages = $scope.infoProductRelative.productImages.filter(prodImg => prodImg.product.productId === product.productId);
        if (productImages.length > 0) {
            return productImages[0].imageName;
        } else {
            return '';
        }
    };

    $scope.getDiscountByProduct = function (product) {
        let discounts = $scope.infoProductRelative.discounts.filter(discount => discount.product.productId === product.productId)
        // console.log("discounts", discounts);
        if (discounts.length > 0) {
            return discounts[0].discountedPrice
        } else {
            return 0
        }

    };



    $scope.listImg();
    $scope.listInfo();

})

