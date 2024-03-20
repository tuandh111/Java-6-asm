console.log("this is cartController")
app.controller("CartCtrl", cartController);

function cartController($scope, $http, $rootScope) {
      $scope.totalCartValue = 0;

      // Hàm để tính tổng tiền của giỏ hàng
      $scope.calculateTotalCartValue = function () {
        $scope.totalCartValue = 0;
        angular.forEach($scope.carts, function (cart) {
          cart.totalPrice = cart.quantity * cart.product.price;
          $scope.totalCartValue += cart.totalPrice;
        });
      };

     $scope.updatePrice = function (cart) {
       cart.totalPrice = cart.quantity * cart.product.price;
        $scope.calculateTotalCartValue();
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
       }
     };

     // Giảm số lượng sản phẩm
     $scope.decrementQuantity = function (cart) {
       if (cart.quantity > 1) {
         cart.quantity--;
         $scope.updatePrice(cart);
       }
     };
    console.log(localStorage.getItem("accessToken"));
    var config = {
      headers: {
        "Content-Type": "application/json", // Đặt kiểu nội dung là JSON
        "Authorization": "Bearer " + localStorage.getItem("accessToken"), // Thêm token vào tiêu đề Authorization nếu cần
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
    };
    console.log(config)
    console.log("this is cartController2");
     $http({
       method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken")
        },
       url: "http://localhost:8080/api/v1/cart",
     }).then(
       function successCallback(response) {
         console.log("this is cartController2");
         console.log(response.data);
         $scope.carts = response.data;
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
     console.log("this is cartController3");
}
