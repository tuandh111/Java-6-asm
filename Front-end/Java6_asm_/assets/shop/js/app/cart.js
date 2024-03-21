console.log("this is cartController");
app.controller("CartCtrl", cartController);

function cartController($scope, $http, $rootScope) {
  $scope.totalCartValue = 0;

  // Hàm để tính tổng tiền của giỏ hàng
  $scope.calculateTotalCartValue = function () {
    $scope.totalCartValue = 0;
    $scope.totalCartAll = 0;
    angular.forEach($scope.carts, function (cart) {
      cart.totalPrice = cart.quantity * cart.product.price;
      $scope.totalCartValue += cart.totalPrice;
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
      cart.totalPrice = cart.quantity * cart.product.price;
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
    console.log("is: ", cart.quantity, cart.product.quantityInStock)
    $scope.updateCart(cart);
  };

  // Tính toán tổng giá tiền
  $scope.calculateTotalPrice = function (cart) {
    return cart.totalPrice || cart.quantity * cart.product.price;
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
      console.log(response.data);
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
  var config = {
    headers: {
      "Content-Type": "application/json", // Đặt kiểu nội dung là JSON
      Authorization: "Bearer " + localStorage.getItem("accessToken"), // Thêm token vào tiêu đề Authorization nếu cần
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
  };
  console.log(config);
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
      console.log("color: " + response.data);
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
      console.log("color: " + response.data);
      $scope.detailsSize = response.data;
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    url: "http://localhost:8080/api/v1/cart",
  }).then(
    function successCallback(response) {
      console.log(response.data);
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
        if (newValue !== oldValue) {
          newValue.forEach(function (value, index) {
            if (value !== oldValue[index]) {
              if (value) {
                console.log("Đã chọn:", "Option " + (index + 1));
              } else {
                console.log("Đã bỏ chọn:", "Option " + (index + 1));
              }
            }
          });
          $scope.checkAll = newValue.every(function (value) {
            return value;
          });
        }
      });
      $scope.carts.forEach(function (cart) {
        // Thực hiện hành động cho từng cart ở đây
        console.log(cart.quantity); // Ví dụ: In ra thông tin của mỗi cart
      });
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
}
