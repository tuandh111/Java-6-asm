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

    $scope.getImageProducts = []

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
        }).catch(error => {
            console.log("error", error);
        })
    }

    $scope.listImg = function () {
        $http.get(url + '/images', { headers: headers }).then(response => {
            $scope.filenames = response.data
            // lưu ảnh
        }).catch(error => {
            console.log("error", error);
        })
    }

    $scope.urlImg = (filename) => {
        return "http://localhost:8080/api/v1/auth/twobee/images/" + filename;
    }


    $scope.listImgProduct = function () {
        $http.get(url + '/uploadImage', { headers: headers }).then(response => {
            $scope.getImageProducts = response.data
            console.log("$scope.getImageProducts", $scope.getImageProducts);
        }).catch(error => {
            console.log("error", error);
        })
    }

    $scope.urlImgProd = (filename) => {
        return "http://localhost:8080/api/v1/auth/twobee/uploadImage/" + filename;
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
        $scope.listProductSortByCreateDate = $scope.infoProductRelative.products.sort((prod1, prod2) => {
            return new Date(prod2.createDate) - new Date(prod1.createDate);
            //return prod2.productId - prod1.productId;
        });
        //  console.log("listProductSortByCreateDate", $scope.listProductSortByCreateDate);
        return $scope.listProductSortByCreateDate
    }

    $scope.getImageByProduct = function (product) {
        if ($scope.infoProductRelative.productImages.length > 0) {
            let productImages = $scope.infoProductRelative.productImages.filter(prodImg => prodImg.product.productId === product.productId);
            if (productImages.length > 0) {
                // console.log("productImages[0].imageName " + product.productId, productImages[0].imageName);
                return productImages[0].imageName;
            } else {
                return '';
            }
        } else {
            return '';
        }

    };

    $scope.getDiscountByProduct = function (product) {
        if ($scope.infoProductRelative.discounts.length > 0) {
            let discounts = $scope.infoProductRelative.discounts.filter(discount => discount.product.productId === product.productId)
            if (discounts.length > 0) {
                return discounts[0].discountedPrice
            } else {
                return 0
            }
        } else {
            return 0
        }
    };

    $scope.getSizesByProduct = function (product) {
        if ($scope.infoProductRelative.detailsSizes.length > 0) {
            let detailsSizeByProduct = $scope.infoProductRelative.detailsSizes.filter(detailsSize => detailsSize.product.productId === product.productId)
            let sizesString = "";
            if (detailsSizeByProduct.length > 0) {
                detailsSizeByProduct.forEach((detail, index) => {
                    sizesString += detail.size.sizeName;
                    if (index < detailsSizeByProduct.length - 1) {
                        sizesString += ", ";
                    }
                })
            }
            return sizesString;
        } else {
            return "";
        }

    }

    $scope.getColorsByProduct = function (product) {
        if ($scope.infoProductRelative.detailsColors.length > 0) {
            let detailsColorByProduct = $scope.infoProductRelative.detailsColors.filter(detailsColor => detailsColor.product.productId === product.productId)
            let colorsString = "";
            if (detailsColorByProduct.length > 0) {
                detailsColorByProduct.forEach((detail, index) => {
                    colorsString += detail.color.colorName;
                    if (index < detailsColorByProduct.length - 1) {
                        colorsString += ", ";
                    }
                })
            }
            return colorsString;
        } else {
            return "";
        }
    }

    $scope.getQuantityInStockByProduct = function (product) {

        if ($scope.infoProductRelative.detailsQuantitys.length > 0) {
            let quantities = $scope.infoProductRelative.detailsQuantitys.filter(detail => detail.productId
                .productId === product.productId)
            let quantityTotal = 0;
            if (quantities.length > 0) {
                quantities.forEach(q => quantityTotal += q.quantity)
            }
            return quantityTotal
        } else {
            return 0;
        }

    }

    $scope.crudProduct = function () {
        $scope.formProduct = {
            productId: -1,
            nameProduct: "",
            quantityInStock: 0,
            price: 0,
            discount: 0,
            isActive: true,
        };
        $scope.editProduct = (product) => {
            console.log("editProduct", product);
            // console.log("product.brand", product.brand);
            $scope.curentBrand = product.brand.nameBrand
            $scope.formProduct = {
                productId: product.productId,
                nameProduct: product.productName,

                quantityInStock: $scope.getQuantityInStockByProduct(product),
                price: product.price,
                discount: $scope.getDiscountByProduct(product),
                isActive: product.isActive
            };
            const triggerFirstTabElProduct = document.querySelector('#manageProducts li:first-child button')
            bootstrap.Tab.getInstance(triggerFirstTabElProduct).show()
        }

        $scope.resetForm = function () {
            $scope.formProduct = {
                productId: -1,
                nameProduct: "",
                quantityInStock: 0,
                price: 0,
                discount: 0,
                isActive: true,
            };
            if ($scope.filenames.length > 0) {
                $scope.filenames.forEach(filename => $scope.deleteImg(filename))
            }
        }

        $scope.updateProduct = function () {
            if ($scope.formProduct.productId == -1) {
                alert("Vui lòng chọn sản phẩm")
                return
            }
            if ($scope.formProduct.nameProduct == "") {
                alert("Vui lòng nhập tên sản phẩm")
                return
            }
            if ($scope.formProduct.quantityInStock < 0 || !$scope.formProduct.price < 0 || !$scope.formProduct.discount < 0) {
                alert("Không được nhập số âm")
                return
            }
            if ($scope.formProduct.discount > $scope.formProduct.price) {
                alert("Giá khuyến mãi không được lớn hơn giá bán")
                return
            }
            let brand = $scope.getBrand()
            if (!brand) {
                alert('Please select a brand')
                return
            }
            let size = $scope.getSize()
            if (!size) {
                alert('Please select a size')
                return
            }
            let color = $scope.getColor()
            if (!color) {
                alert('Please select a color')
                return
            }
            if ($scope.filenames.length > 0) {
                $scope.formProduct.images = $scope.filenames
            } else {
                $scope.formProduct.images = ""
            }
            var requsetProductJSON = angular.toJson($scope.formProduct)
            var prodId = $scope.formProduct.productId === undefined ? -1 : $scope.formProduct.productId;
            // console.log("requsetProductJSON", requsetProductJSON);
            // console.log("$scope.formProduct", $scope.formProduct);
            //gọi api đi
            $http.put(url + "/products/" + prodId, requsetProductJSON, { headers: headers }).then(
                response => {
                    console.log("response", response.data);
                    //console.log("$scope.filenames moving", $scope.filenames);
                    var requsetFileJSON = angular.toJson($scope.filenames)
                    $http.post(url + '/move/images', requsetFileJSON, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined,
                            ...headers
                        }
                    }).then(response => {
                        $scope.listImgProduct();
                        $scope.resetForm();
                        console.log("response move file", response);
                        Swal.fire({
                            title: "Thành công!",
                            html: "Đã cập nhật sản phẩm thành công!",
                            icon: "success"
                        }).then(rs => {
                            if (rs.isConfirmed) {
                                const triggerSecondTabEl = document.querySelector('#manageBrands li:nth-child(2) button');
                                new bootstrap.Tab(triggerSecondTabEl).show()
                                const triggerFirstTabElProduct = document.querySelector('#manageProducts li:first-child button')
                                bootstrap.Tab.getInstance(triggerFirstTabElProduct).show()
                            }
                        })
                    }).catch(error => {
                        console.log("error for post /move/images", error);
                    })
                }).catch(err => {
                    console.log("error", err.data);
                })
        }
    }

    $scope.getBrand = function () {
        return $scope.formProduct.selectedBrand;
    };

    $scope.getSize = function () {
        return $scope.formProduct.selectedSize;
    };
    $scope.getColor = function () {
        return $scope.formProduct.selectedColor;
    }

    $scope.listImg();
    $scope.listInfo();
    $scope.crudProduct();
})

