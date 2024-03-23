console.log("this is cartController");
app.controller("CartCtrl", cartController);

function cartController($scope, $http, $rootScope) {
  var selectedOptions = [];
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
                selectedOptions.push(cartId);
              } else {
                console.log("Đã bỏ chọn:", "Option " + cartId);
                var selectedIndex = selectedOptions.indexOf(cartId); // Tìm chỉ số của phần tử đã chọn
                if (selectedIndex !== -1) {
                  selectedOptions.splice(selectedIndex, 1); // Loại bỏ phần tử đã chọn khỏi mảng
                }
              }
            }
          });
          $scope.checkAll = newValue.every(function (value) {
            return value;
          });
          console.log("Các option đã chọn:", selectedOptions);
        }
      });
      $scope.carts.forEach(function (cart) {
        // Thực hiện hành động cho từng cart ở đây// Ví dụ: In ra thông tin của mỗi cart
      });
    },
    function errorCallback(response) {
    }
  );
  //////////////////getAll DetailsColor
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/details-color",
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
    url: "http://localhost:8080/api/v1/details-size",
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
  // Hàm để tính tổng tiền của giỏ hàng
  $scope.calculateTotalCartValue = function () {
    $scope.totalCartValue = 0;
    $scope.totalCartAll = 0;
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
      $scope.totalCartAll = $scope.totalCartValue
    } else {
      $scope.freeShip = '25,000 VNĐ';
      $scope.totalCartAll = $scope.totalCartValue + 25000
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

function copyCode() {
  // Lấy mã từ phần tử có id="code"
  var codeElement = document.getElementById('code');
  var code = codeElement.innerText;

  // Tạo một input ẩn để sao chép mã
  var tempInput = document.createElement('input');
  tempInput.setAttribute('type', 'text');
  tempInput.setAttribute('value', code);
  document.body.appendChild(tempInput);

  // Chọn và sao chép mã vào clipboard
  tempInput.select();
  document.execCommand('copy');
  Swal.fire({
    title: "Thành công!",
    text: "Sao chép mã " + code + " thành công",
    icon: "success"
  });
  // Xóa input tạm thời
  document.body.removeChild(tempInput);

  // Hiển thị thông báo đã sao chép
}