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
        if (files == null) {
            alert("Upload hình chưa thành công")
            return
        }
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
                // return productImages[0].imageName;
                return productImages;
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
            $scope.currentBrand = product.brand.nameBrand
            $scope.currentSizes = $scope.getSizesByProduct(product)
            $scope.currentColors = $scope.getColorsByProduct(product)
            $scope.formProduct.images = $scope.getImageByProduct(product)
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
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn sản phẩm!",
                    icon: "error"
                })
                return
            }

            if ($scope.formProduct.nameProduct == "") {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng nhập tên sản phẩm!",
                    icon: "error"
                })
                return
            }
            if ($scope.formProduct.quantityInStock < 0 || !$scope.formProduct.price < 0 || !$scope.formProduct.discount < 0) {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Không được nhập số âm!",
                    icon: "error"
                })
                return
            }
            if ($scope.formProduct.discount > $scope.formProduct.price) {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Giá khuyến mãi không được lớn hơn giá bán!",
                    icon: "error"
                })
                return
            }
            let brand = $scope.getBrand()
            if (!brand) {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn danh mục!",
                    icon: "error"
                })
                return
            }
            let size = $scope.getSize()
            if (!size) {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn size!",
                    icon: "error"
                })
                return
            }
            let color = $scope.getColor()
            if (!color) {
                Swal.fire({
                    title: "Cảnh báo!",
                    html: "Vui lòng chọn màu!",
                    icon: "error"
                })
                return
            }
            if ($scope.filenames.length > 0) {
                $scope.formProduct.images = $scope.filenames
            }

            var requsetProductJSON = angular.toJson($scope.formProduct)
            var prodId = $scope.formProduct.productId === undefined ? -1 : $scope.formProduct.productId;
            console.log("$scope.formProduct", $scope.formProduct);
            $http.put(url + "/products/" + prodId, requsetProductJSON, { headers: headers }).then(
                response => {
                    console.log("response", response.data);
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
                        })
                        const secondTabButton = document.getElementById('list-tab');
                        secondTabButton.click();
                        $scope.listInfo();
                    }).catch(error => {
                        console.log("error for post /move/images", error);
                    })
                }).catch(err => {
                    console.log("error form update product", err);
                })
        }

        $scope.deleteProduct = function () {
            var prodId = $scope.formProduct.productId === undefined ? -1 : $scope.formProduct.productId;
            Swal.fire({
                text: "Bạn có muốn xóa sản phẩm ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Trở lại',
                confirmButtonText: 'Có'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http.delete(url + "/products/" + prodId, { headers: headers }).then(
                        respone => {
                            $scope.resetForm();
                            Swal.fire({
                                title: "Thành công!",
                                html: "Đã xóa thành công!",
                                icon: "success"
                            }).then(rs => {
                                if (rs.isConfirmed) {
                                    const secondTabButtonDel = document.getElementById('list-tab');
                                    secondTabButtonDel.click();
                                    $scope.listInfo();
                                }
                            })
                        }
                    ).catch(
                        err => {
                            console.log("Error during delete request for Product", err)
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

        $scope.deleteProductById = function (product) {
            var prodId = product.productId;
            Swal.fire({
                text: "Bạn có muốn xóa sản phẩm ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Trở lại',
                confirmButtonText: 'Có'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http.delete(url + "/products/" + prodId, { headers: headers }).then(
                        respone => {
                            $scope.resetForm();
                            Swal.fire({
                                title: "Thành công!",
                                html: "Đã xóa thành công!",
                                icon: "success"
                            }).then(rs => {
                                if (rs.isConfirmed) {
                                    const secondTabButtonDel = document.getElementById('list-tab');
                                    secondTabButtonDel.click();
                                    $scope.listInfo();
                                }
                            })
                        }
                    ).catch(
                        err => {
                            console.log("Error during delete request for Product", err)
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

