console.log("this is cartController");
app.controller("CartCtrl", cartController);

function cartController($scope, $http, $rootScope) {

  //color
  $scope.openModel = function (productId) {
    // Gán productId vào $scope để hiển thị trong model
    $scope.productId = productId;
    console.log("productId: " + productId);
    document.getElementById(String(productId + "_color")).style.display = "block";
  }

  $scope.closeModel = function (productId) {
    document.getElementById(String(productId + "_color")).style.display = "none";
  }
  //size
  $scope.openModelSize = function (detailsSizeId) {
    // Gán productId vào $scope để hiển thị trong model

    console.log("productIdSize: " + detailsSizeId);
    document.getElementById(String(detailsSizeId + '_size')).style.display = "block";
  }

  $scope.closeModelSize = function (detailsSizeId) {
    document.getElementById(String(detailsSizeId + '_size')).style.display = "none";
  }
  //////////////////////////////////////////////////////////////////////////

  //Đổi màu
  $scope.selectedColor = {};

  // Hàm xử lý sự kiện khi nhấn nút "Xác nhận"
  $scope.discolor = function (cart) {
    // Lấy giá trị mà người dùng đã chọn từ $scope.selectedColor và cart
    var selectedColorId = $scope.selectedColor[cart.product.productId];

    var requestData = {
      productId: cart.product.productId,
      colorId: selectedColorId,
      userId: 4,
    };
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/update-cart-color/" + cart.cartId,
    }).then(function (response) {
      $scope.loadData()
      Swal.fire({
        title: "Thành công!",
        text: "Thay đổi màu thành công",
        icon: "success"
      });

    });

  };
  $scope.selectedSize = {};
  //update Size
  $scope.dissize = function (cart) {
    console.log("dissize")
    // Lấy giá trị mà người dùng đã chọn từ $scope.selectedColor và cart
    var selectedSizeId = $scope.selectedSize[cart.product.productId];
    console.log('is', selectedSizeId)
    var requestData = {
      productId: cart.product.productId,
      sizeId: selectedSizeId,
      userId: 4,
    };
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/update-cart-size/" + cart.cartId,
    }).then(function (response) {
      $scope.loadData()
      Swal.fire({
        title: "Thành công!",
        text: "Thay đổi size thành công",
        icon: "success"
      });

    });

  };
  //add voucher
  $scope.apply = function () {
    console.log("apply")
    // Lấy giá trị mà người dùng đã chọn từ $scope.selectedColor và cart
    var requestData = {
      voucherName: $scope.voucherName
    };
    console.log(requestData);
    // $http({
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //     "X-Refresh-Token": localStorage.getItem("refreshToken"),
    //   },
    //   data: JSON.stringify(requestData),
    //   url: "http://localhost:8080/api/v1/update-cart-size/" + cart.cartId,
    // }).then(function (response) {
    //   $scope.loadData()
    //   Swal.fire({
    //     title: "Thành công!",
    //     text: "Thay đổi size thành công",
    //     icon: "success"
    //   });

    // });

  };
  //loadData
  $scope.loadData = function () {
    $http({
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      url: "http://localhost:8080/api/v1/cart",
    }).then(
      function successCallback(response) {
        $scope.carts = response.data;
        if ($scope.carts.length === 0) {
          // $scope.carts là một mảng rỗng
          $scope.ContinueProduct = 'Tiếp tục mua sắm'
        } else {
          // $scope.carts không rỗng
          $scope.ContinueProduct = ''
        }
        $scope.checkAll = false;
        $scope.options = [];
        for (var i = 0; i < $scope.carts.length; i++) {
          $scope.options[i] = false;
        }

        $scope.$watch("checkAll", function (newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.options = $scope.options.map(function () {
              return newValue;
            });
          }
        });
        $scope.$watchCollection("options", function (newValue, oldValue) {
          console.log("options", newValue, oldValue);
          if (newValue !== oldValue) {
            newValue.forEach(function (value, index) {
              if (value !== oldValue[index]) {
                var cartId = $scope.carts[index].cartId;
                if (value) {
                  console.log("Đã chọn:", "Option " + cartId);
                  $rootScope.selectedOptions.push(cartId);
                } else {
                  console.log("Đã bỏ chọn:", "Option " + cartId);
                  var selectedIndex = $rootScope.selectedOptions.indexOf(cartId); // Tìm chỉ số của phần tử đã chọn
                  if (selectedIndex !== -1) {
                    $rootScope.selectedOptions.splice(selectedIndex, 1); // Loại bỏ phần tử đã chọn khỏi mảng
                  }
                }
              }
            });
            $scope.checkAll = newValue.every(function (value) {
              return value;
            });
            console.log("Các option đã chọn:", $rootScope.selectedOptions);
            $scope.totalCartValue = 0;
            $scope.totalCartAll = 0;
            var selectedOptions = $rootScope.selectedOptions
            console.log("selectedOptions1", selectedOptions);
            angular.forEach($scope.carts, function (cart) {

              if (selectedOptions.includes(String(cart.cartId))) {
                console.log(1)
                if ($scope.isDiscounted(cart.product.productId)) {
                  for (var i = 0; i < $scope.discounts.length; i++) {
                    if ($scope.discounts[i].product.productId === cart.product.productId) {
                      cart.totalPrice = cart.quantity * $scope.discounts[i].discountedPrice;
                      break;
                    }
                  }
                } else {
                  cart.totalPrice = cart.quantity * cart.product.price;
                }
                $scope.totalCartValue += cart.totalPrice;
              }
            });

            if ($scope.totalCartValue > 3000000) {
              $scope.freeShip = 'Miễn phí giao hàng';
              $scope.discountTitle = 'Giảm giá đơn hàng:'
              $scope.discount = ' -150,000 VNĐ'
              $scope.totalCartAll = $scope.totalCartValue - 150000
            } else if ($scope.totalCartValue > 100000) {
              if ($scope.totalCartValue > 999000) {
                $scope.discountTitle = 'Giảm giá đơn hàng:'
                $scope.discount = ' -80,000 VNĐ'
                $scope.totalCartAll = $scope.totalCartValue - 80000
              } else if ($scope.totalCartValue > 599000) {
                $scope.discountTitle = 'Giảm giá đơn hàng:'
                $scope.discount = ' -50,000 VNĐ'
                $scope.totalCartAll = $scope.totalCartValue - 50000
              }
              $scope.freeShip = '25,000 VNĐ';
              $scope.totalCartAll = $scope.totalCartValue + 25000
            } else {
              $scope.freeShip = '';
              $scope.discount = ''
            }
          }
        });

      },
      function errorCallback(response) {
      }
    );
  }




  $rootScope.selectedOptions = [];
  $scope.discounts = [];
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/cart",
  }).then(
    function successCallback(response) {
      $scope.carts = response.data;
      if ($scope.carts.length === 0) {
        // $scope.carts là một mảng rỗng
        $scope.ContinueProduct = 'Tiếp tục mua sắm'
      } else {
        // $scope.carts không rỗng
        $scope.ContinueProduct = ''
      }
      $scope.checkAll = false;
      $scope.options = [];
      for (var i = 0; i < $scope.carts.length; i++) {
        $scope.options[i] = false;
      }

      $scope.$watch("checkAll", function (newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.options = $scope.options.map(function () {
            return newValue;
          });
        }
      });
      $scope.$watchCollection("options", function (newValue, oldValue) {
        console.log("options", newValue, oldValue);
        if (newValue !== oldValue) {
          newValue.forEach(function (value, index) {
            if (value !== oldValue[index]) {
              var cartId = $scope.carts[index].cartId;
              if (value) {
                console.log("Đã chọn:", "Option " + cartId);
                $rootScope.selectedOptions.push(cartId);
              } else {
                console.log("Đã bỏ chọn:", "Option " + cartId);
                var selectedIndex = $rootScope.selectedOptions.indexOf(cartId); // Tìm chỉ số của phần tử đã chọn
                if (selectedIndex !== -1) {
                  $rootScope.selectedOptions.splice(selectedIndex, 1); // Loại bỏ phần tử đã chọn khỏi mảng
                }
              }
            }
          });
          $scope.checkAll = newValue.every(function (value) {
            return value;
          });
          console.log("Các option đã chọn:", $rootScope.selectedOptions);
          $scope.totalCartValue = 0;
          $scope.totalCartAll = 0;
          var selectedOptions = $rootScope.selectedOptions
          console.log("selectedOptions1", selectedOptions);
          angular.forEach($scope.carts, function (cart) {

            if (selectedOptions.includes(String(cart.cartId))) {
              console.log(1)
              if ($scope.isDiscounted(cart.product.productId)) {
                for (var i = 0; i < $scope.discounts.length; i++) {
                  if ($scope.discounts[i].product.productId === cart.product.productId) {
                    cart.totalPrice = cart.quantity * $scope.discounts[i].discountedPrice;
                    break;
                  }
                }
              } else {
                cart.totalPrice = cart.quantity * cart.product.price;
              }
              $scope.totalCartValue += cart.totalPrice;
            }
          });

          if ($scope.totalCartValue > 3000000) {
            $scope.freeShip = 'Miễn phí giao hàng';
            $scope.discountTitle = 'Giảm giá đơn hàng:'
            $scope.discount = ' -150,000 VNĐ'
            $scope.totalCartAll = $scope.totalCartValue - 150000
          } else if ($scope.totalCartValue > 100000) {
            if ($scope.totalCartValue > 999000) {
              $scope.discountTitle = 'Giảm giá đơn hàng:'
              $scope.discount = ' -80,000 VNĐ'
              $scope.totalCartAll = $scope.totalCartValue - 80000
            } else if ($scope.totalCartValue > 599000) {
              $scope.discountTitle = 'Giảm giá đơn hàng:'
              $scope.discount = ' -50,000 VNĐ'
              $scope.totalCartAll = $scope.totalCartValue - 50000
            }
            $scope.freeShip = '25,000 VNĐ';
            $scope.totalCartAll = $scope.totalCartValue + 25000
          } else {
            $scope.freeShip = '';
            $scope.discount = ''
          }
        }
      });

    },
    function errorCallback(response) {
    }
  );
  //////////////////getAll voucher
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/voucher",
  }).then(
    function successCallback(response) {
      $scope.vouchers = response.data;
      $scope.copyVoucher = function copyCode(voucherName) {
        console.log('copyCode', voucherName)
        // Lấy mã từ phần tử có id="code"
        var codeElement = document.getElementById(voucherName);
        var code = codeElement.innerText;

        // Tạo một input ẩn để sao chép mã
        var tempInput = document.createElement('input');
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('value', code);
        document.body.appendChild(tempInput);

        // Chọn và sao chép mã vào clipboard
        tempInput.select();
        document.execCommand('copy');
        // Xóa input tạm thời
        document.body.removeChild(tempInput);
        Swal.fire({
          title: "Thành công!",
          text: "Sao chép mã " + code + " thành công",
          icon: "success"
        });
        // Hiển thị thông báo đã sao chép
      }

    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
  ////
  //////////////////getAll DetailsColor
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/auth/details-color",
  }).then(
    function successCallback(response) {
      $scope.detailsColor = response.data;
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
  ////////////////////getAll DetailsSize
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/auth/details-size",
  }).then(
    function successCallback(response) {
      $scope.detailsSize = response.data;
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
  //////////////////// findAll Discount
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/discount",
  }).then(
    function successCallback(response) {
      $scope.discounts = response.data;
      $scope.isDiscounted = function (productId) {
        for (var i = 0; i < $scope.discounts.length; i++) {
          if ($scope.discounts[i].product.productId === productId) {
            return true;
          }
        }
        return false;
      };

    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
  //////DELETE CART
  $scope.deleteCart = function (cart) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
          },
          url: "http://localhost:8080/api/v1/delete-cart/" + cart.cartId,
        }).then(
          function successCallback(response) {
            console.log(response);
            Swal.fire({
              title: "Thành công!",
              text: "Xóa sản phẩm ra khỏi giỏ hàng thành công",
              icon: "success"
            });
            $scope.loadData()
          },
          function errorCallback(response) {

            Swal.fire({
              title: "Lỗi!",
              text: "Xóa sản phẩm ra khỏi giỏ hàng thành công",
              icon: "error"
            });
          }
        );

      }
    });

  }


  // Hàm để tính tổng tiền của giỏ hàng
  $scope.calculateTotalCartValue = function () {
    $scope.totalCartValue = 0;
    $scope.totalCartAll = 0;
    var selectedOptions = $rootScope.selectedOptions
    console.log("selectedOptions", selectedOptions);
    angular.forEach($scope.carts, function (cart) {

      if (selectedOptions.includes(String(cart.cartId))) {
        console.log(1)
        if ($scope.isDiscounted(cart.product.productId)) {
          for (var i = 0; i < $scope.discounts.length; i++) {
            if ($scope.discounts[i].product.productId === cart.product.productId) {
              cart.totalPrice = cart.quantity * $scope.discounts[i].discountedPrice;
              break;
            }
          }
        } else {
          cart.totalPrice = cart.quantity * cart.product.price;
        }
        $scope.totalCartValue += cart.totalPrice;
      }
    });

    if ($scope.totalCartValue > 3000000) {
      $scope.freeShip = 'Miễn phí giao hàng';
      $scope.discountTitle = 'Giảm giá đơn hàng:'
      $scope.discount = ' -150,000 VNĐ'
      $scope.totalCartAll = $scope.totalCartValue - 150000
    } else if ($scope.totalCartValue > 100000) {
      if ($scope.totalCartValue > 999000) {
        $scope.discountTitle = 'Giảm giá đơn hàng:'
        $scope.discount = ' -80,000 VNĐ'
        $scope.totalCartAll = $scope.totalCartValue - 80000
      } else if ($scope.totalCartValue > 599000) {
        $scope.discountTitle = 'Giảm giá đơn hàng:'
        $scope.discount = ' -50,000 VNĐ'
        $scope.totalCartAll = $scope.totalCartValue - 50000
      }
      $scope.freeShip = '25,000 VNĐ';
      $scope.totalCartAll = $scope.totalCartValue + 25000
    } else {
      $scope.discount = ''
      $scope.freeShip = '';
    }
  };


  $scope.updatePrice = function (cart) {
    if (cart.quantity <= cart.product.quantityInStock && cart.quantity > 0) {
      if ($scope.isDiscounted(cart.product.productId)) {
        for (var i = 0; i < $scope.discounts.length; i++) {
          if ($scope.discounts[i].product.productId === cart.product.productId) {
            cart.totalPrice = cart.quantity * $scope.discounts[i].discountedPrice;
            break;
          }
        }
      } else {
        cart.totalPrice = cart.quantity * cart.product.price;
      }
      $scope.calculateTotalCartValue();
    } else if (cart.quantity > cart.product.quantityInStock) {
      Swal.fire({
        title: "Lỗi!",
        text: "Số lượng không được lớn hơn số lượng trong kho!",
        icon: "error"
      });
      cart.quantity = cart.product.quantityInStock
    } else if (cart.quantity < 1) {
      Swal.fire({
        title: "Lỗi!",
        text: "Số lượng phải lớn hơn 0",
        icon: "error"
      });
      cart.quantity = 1
    }
    $scope.updateCart(cart);
  };

  // Tính toán tổng giá tiền
  $scope.calculateTotalPrice = function (cart) {

    if ($scope.isDiscounted(cart.product.productId)) {
      for (var i = 0; i < $scope.discounts.length; i++) {
        if ($scope.discounts[i].product.productId === cart.product.productId) {
          cart.totalPrice = cart.quantity * $scope.discounts[i].discountedPrice;
          break;
        }
      }
    } else {
      cart.totalPrice = cart.quantity * cart.product.price;
    }
    return cart.totalPrice;
  };

  // Tăng số lượng sản phẩm
  $scope.incrementQuantity = function (cart) {
    if (cart.quantity < cart.product.quantityInStock) {
      cart.quantity++;
      $scope.updatePrice(cart);
    } else {
      Swal.fire({
        title: "Lỗi!",
        text: "Số lượng không được lớn hơn số lượng trong kho!",
        icon: "error"
      });
      cart.quantity = cart.product.quantityInStock
    }
    $scope.updateCart(cart);
  };
  //////////////// updateCart
  $scope.updateCart = function (cart) {
    var requestData = {
      quantity: cart.quantity,
      productId: cart.product.productId,
      userId: 4,
    };
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/update-cart/" + cart.cartId,
    }).then(function (response) {

    });
  };
  // Giảm số lượng sản phẩm
  $scope.decrementQuantity = function (cart) {
    if (cart.quantity > 1) {
      cart.quantity--;
      $scope.updatePrice(cart);
      $scope.updateCart(cart);
    } else {
      Swal.fire({
        title: "Lỗi!",
        text: "Số lượng phải lớn hơn 0!",
        icon: "error"
      });
    }
  };

}
