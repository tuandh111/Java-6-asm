console.log("this is cartController");
app.controller("CartCtrl", cartController);

function cartController($scope, $http, $rootScope) {
  let headers = {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    "X-Refresh-Token": localStorage.getItem("refreshToken"),
  }

  $http.get("http://localhost:8080/api/v1/by-userId", { headers: headers }).then(respone => {
    console.log("userrrrr", respone.data);
    $scope.userInfo = respone.data;
  }).catch(err => {
    console.log("error", err);
  })
  //color
  $scope.openModel = function (productId) {
    // Gán productId vào $scope để hiển thị trong model
    $scope.productId = productId;
    document.getElementById(String(productId + "_color")).style.display = "block";
  }

  $scope.closeModel = function (productId) {
    document.getElementById(String(productId + "_color")).style.display = "none";
  }
  //size
  $scope.openModelSize = function (detailsSizeId) {
    // Gán productId vào $scope để hiển thị trong model
    document.getElementById(String(detailsSizeId + '_size')).style.display = "block";
  }

  $scope.closeModelSize = function (detailsSizeId) {
    document.getElementById(String(detailsSizeId + '_size')).style.display = "none";
  }
  //address
  $scope.openModelAddress = function (detailsSizeId) {
    // Gán productId vào $scope để hiển thị trong model
    document.getElementById(String(detailsSizeId)).style.display = "block";
  }

  $scope.closeModelAddress = function (detailsSizeId) {
    document.getElementById(String(detailsSizeId)).style.display = "none";
  }
  //OptionSize
  $scope.openModelOptionSize = function (detailsSizeId) {
    // Gán productId vào $scope để hiển thị trong model
    document.getElementById(String(detailsSizeId + '_size')).style.display = "block";
  }

  $scope.closeModelOptionSize = function (detailsSizeId) {
    document.getElementById(String(detailsSizeId + '_size')).style.display = "none";
  }
  //////////////////////////////////////////////////////////////////////////

  //Khai báo biến
  $scope.selectedColor = {};
  $scope.carts = {};
  $scope.isDiscounted;
  $scope.selectedColorDetailsProduct = {};
  $scope.selectedDetailsSizeId = {};
  $scope.quantityProduct = 1;
  $scope.selectedSize = {};
  $scope.countCart = 0
  $rootScope.selectedOptions = [];
  $scope.discounts = [];

  var uri = window.location.href;
  var parts = uri.split('/');
  var id = parts[parts.length - 1];

  $http({
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },

    url: "http://localhost:8080/api/v1/favorites",
  }).then(
    function successCallback(response) {
      $scope.favorites = response.data;
      $('#nav-like__circle').html($scope.favorites.length)
      $scope.isFavorite = function (productId) {
        for (var i = 0; i < $scope.favorites.length; i++) {
          if ($scope.favorites[i].productId.productId === productId) {
            return true;
          }
        }
        return false;
      };
      console.log("isLiked" + $scope.isLiked)
    },
    function errorCallback(response) {
      window.location.href = '/index.html#!/shop/login';
    }
  );
  $scope.addToFavorites1 = function (productId) {
    var requestData = {
      productId: productId,
      userId: 1,
    };
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/save-favorites",
    }).then(
      function successCallback(response) {
        Swal.fire({
          title: "Thành công!",
          text: "Thêm vào yêu thích thành công",
          icon: "success"
        });
        $http({
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
          },

          url: "http://localhost:8080/api/v1/favorites",
        }).then(
          function successCallback(response) {
            $scope.favorites = response.data;
            $('#nav-like__circle').html($scope.favorites.length)
            $scope.isFavorite = function (productId) {
              for (var i = 0; i < $scope.favorites.length; i++) {
                if ($scope.favorites[i].productId.productId === productId) {
                  return true;
                }
              }
              return false;
            };
            console.log("isLiked" + $scope.isLiked)
          },
          function errorCallback(response) {
          }
        );
      },
      function errorCallback(response) {
      }
    );
  };
  $scope.removeFromFavorites1 = function (productId) {
    console.log("Removing")
    var requestData = {
      productId: productId,
      userId: 1,
    };
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/delete-favorites",
    }).then(
      function successCallback(response) {
        Swal.fire({
          title: "Thành công!",
          text: "Xóa khỏi yêu thích thành công",
          icon: "success"
        });
        $http({
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
          },

          url: "http://localhost:8080/api/v1/favorites",
        }).then(
          function successCallback(response) {
            $scope.favorites = response.data;
            $('#nav-like__circle').html($scope.favorites.length)
            $scope.isFavorite = function (productId) {
              for (var i = 0; i < $scope.favorites.length; i++) {
                if ($scope.favorites[i].productId.productId === productId) {
                  return true;
                }
              }
              return false;
            };
            console.log("isLiked" + $scope.isLiked)
          },
          function errorCallback(response) {
          }
        );
      },
      function errorCallback(response) {
        console.log("error")
      }
    );
  };


  // Hàm xử lý sự kiện khi nhấn nút "Xác nhận"
  $scope.discolor = function (cart) {
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
      var json = response.data;
      if (json.message == 'ErrorCart') {
        Swal.fire({
          title: "Thất bại!",
          text: "Sản phẩm này đã tồn tại trong giỏ hàng",
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Thành công!",
          text: "Thay đổi màu thành công",
          icon: "success"
        });
        $scope.loadData()
      }

    });

  };
  //update Size
  $scope.dissize = function (cart) {

    var selectedSizeId = $scope.selectedSize[cart.product.productId];
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
      var json = response.data
      if (json.message == 'ErrorCart') {
        Swal.fire({
          title: "Thất bại!",
          text: "Sản phẩm này đã tồn tại trong giỏ hàng",
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Thành công!",
          text: "Thay đổi size thành công",
          icon: "success"
        });
        $scope.loadData()
      }
    });

  };
  //add voucher
  $scope.apply = function () {
    var requestData = {
      voucherName: $scope.voucherName
    };
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
        $scope.countCart = $scope.carts.length
        $('#nav-shop__circle').html($scope.carts.length);
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
          if (newValue !== oldValue) {
            newValue.forEach(function (value, index) {
              if (value !== oldValue[index]) {
                var cartId = $scope.carts[index].cartId;
                if (value) {
                  $rootScope.selectedOptions.push(cartId);
                } else {
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
            $scope.totalCartValue = 0;
            $scope.totalCartAll = 0;
            var selectedOptions = $rootScope.selectedOptions;
            angular.forEach($scope.carts, function (cart) {
              if (selectedOptions.includes(String(cart.cartId))) {
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

              } else {
                $scope.totalCartAll = $scope.totalCartValue
                $scope.discountTitle = ''
                $scope.discount = ''

              }
              $scope.freeShip = '25,000 VNĐ';
              $scope.totalCartAll = $scope.totalCartAll + 25000
            } else {

              $scope.discountTitle = ''
              $scope.discount = ''
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
      $scope.countCart = $scope.carts.length
      if ($scope.carts.length === 0) {
        $scope.ContinueProduct = 'Tiếp tục mua sắm'
      } else {
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
        if (newValue !== oldValue) {
          newValue.forEach(function (value, index) {
            if (value !== oldValue[index]) {
              var cartId = $scope.carts[index].cartId;
              if (value) {
                $rootScope.selectedOptions.push(cartId);
              } else {
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
          $scope.totalCartValue = 0;
          $scope.totalCartAll = 0;
          var selectedOptions = $rootScope.selectedOptions
          //Giá trị checkCartId
          console.log("checkCartId", selectedOptions)
          localStorage.removeItem("checkCartId")
          localStorage.setItem("checkCartId", selectedOptions)
          angular.forEach($scope.carts, function (cart) {
            if (selectedOptions.includes(String(cart.cartId))) {
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
            else {
              $scope.totalCartAll = $scope.totalCartValue
              $scope.discountTitle = ''
              $scope.discount = ''
            }
            $scope.freeShip = '25,000 VNĐ';
            $scope.totalCartAll = $scope.totalCartAll + 25000
          } else {
            $scope.discountTitle = ''
            $scope.discount = ''
            $scope.freeShip = '';
            $scope.discount = ''
          }
        }

      }
      );

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
    url: "http://localhost:8080/api/v1/auth/voucher",
  }).then(
    function successCallback(response) {
      $scope.vouchers = response.data;
      $scope.copyVoucher = function copyCode(voucherName) {
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
  //clickProduct Details

  $scope.message = function (productId) {
    $http({
      method: "GET",
      url: "http://localhost:8080/api/v1/auth/comment/" + productId,
    }).then(
      function successCallback(response) {
        $scope.comments = response.data;
        $scope.countMessage = 0;
        var totalStars = 0;
        $scope.totalStars5 = 0;
        $scope.totalStars4 = 0;
        $scope.totalStars3 = 0;
        $scope.totalStars2 = 0;
        $scope.totalStars1 = 0;
        var numberOfComments = $scope.comments.length;
        for (var i = 0; i < numberOfComments; i++) {
          $scope.countMessage++;
          totalStars += $scope.comments[i].star;
          if ($scope.comments[i].star === 5) {
            $scope.totalStars5++;
          }
          if ($scope.comments[i].star === 4) {
            $scope.totalStars4++;
          }
          if ($scope.comments[i].star === 3) {
            $scope.totalStars3++;
          }
          if ($scope.comments[i].star === 2) {
            $scope.totalStars2++;
          }
          if ($scope.comments[i].star === 1) {
            $scope.totalStars1++;
          }
        }
        var averageStars = totalStars / numberOfComments;
        $scope.averageStars = Math.round(averageStars * 10) / 10;
        console.log("Trung bình số sao:", averageStars);

      },
      function errorCallback(response) {
      }
    );
  }
  var requestData = {
    productId: id,
    userId: 1,
  };

  $http({
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "X-Refresh-Token": localStorage.getItem("refreshToken"),
    },
    data: JSON.stringify(requestData),
    url: "http://localhost:8080/api/v1/check-favorites",
  }).then(
    function successCallback(response) {
      $scope.checkFavorites = response.data;
      $('#nav-like__circle').html($scope.checkFavorites.length)
      console.log($scope.checkFavorites.length)
      $scope.isLiked = false;
      if ($scope.checkFavorites.length == 0) {
        $scope.isLiked = false;
      } else {
        $scope.isLiked = true;
      }
      console.log("isLiked" + $scope.isLiked)
    },
    function errorCallback(response) {
      // Xử lý lỗi nếu có
    }
  );

  // Hàm xử lý khi người dùng nhấn vào nút "Thêm vào yêu thích"
  $scope.addToFavorites = function (productId) {
    // Tạo dữ liệu yêu cầu
    var requestData = {
      productId: productId,
      userId: 1,
    };

    // Gửi yêu cầu POST để thêm sản phẩm vào danh sách yêu thích
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/save-favorites",
    }).then(
      function successCallback(response) {
        Swal.fire({
          title: "Thành công!",
          text: "Thêm vào yêu thích thành công",
          icon: "success"
        });
        $http({
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
          },
          data: JSON.stringify(requestData),
          url: "http://localhost:8080/api/v1/check-favorites",
        }).then(
          function successCallback(response) {
            // Lưu danh sách sản phẩm đã thích vào biến $scope.checkFavorites
            $scope.checkFavorites = response.data;
            $('#nav-like__circle').html($scope.checkFavorites.length)
            console.log($scope.checkFavorites.length)
            // Kiểm tra xem sản phẩm đã được thích chưa

            // Nếu sản phẩm đã được thích, thì cập nhật trạng thái của nút
            $scope.isLiked = false;
            if ($scope.checkFavorites.length == 0) {
              $scope.isLiked = false;
            } else {
              $scope.isLiked = true;
            }
            console.log("isLiked" + $scope.isLiked)
          },
          function errorCallback(response) {
            // Xử lý lỗi nếu có
          }
        );
      },
      function errorCallback(response) {
        // Xử lý lỗi nếu có
      }
    );
  };
  $scope.removeFromFavorites = function (productId) {
    console.log("Removing")
    // Tạo dữ liệu yêu cầu
    var requestData = {
      productId: productId,
      userId: 1,
    };

    // Gửi yêu cầu POST để xóa sản phẩm khỏi danh sách yêu thích
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/delete-favorites",
    }).then(
      function successCallback(response) {
        Swal.fire({
          title: "Thành công!",
          text: "Xóa khỏi yêu thích thành công",
          icon: "success"
        });
        $http({
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "X-Refresh-Token": localStorage.getItem("refreshToken"),
          },
          data: JSON.stringify(requestData),
          url: "http://localhost:8080/api/v1/check-favorites",
        }).then(
          function successCallback(response) {
            $scope.checkFavorites = response.data;
            $('#nav-like__circle').html($scope.checkFavorites.length)
            console.log($scope.checkFavorites.length)
            $scope.isLiked = false;
            if ($scope.checkFavorites.length == 0) {
              $scope.isLiked = false;
            } else {
              $scope.isLiked = true;
            }
            console.log("isLiked" + $scope.isLiked)
          },
          function errorCallback(response) {
            // Xử lý lỗi nếu có
          }
        );
      },
      function errorCallback(response) {
        console.log("error")
        // Xử lý lỗi nếu có
      }
    );
  };


  ///Post comments
  $scope.submitFormMessage = function () {
    console.log($scope.selectedRating);
    console.log($scope.messageContent);
    console.log(id);
    if ($scope.selectedRating === undefined || $scope.selectedRating == '') {
      $scope.errorRating = '(*) Vui lòng nhập sao để trước khi đánh giá'
      return;
    } else {
      $scope.errorRating = ''
    }
    if ($scope.messageContent === undefined || $scope.messageContent == '') {
      $scope.errorMessage = '(*) Vui lòng nhập bình luận sản phẩm'
      return;
    } else {
      $scope.errorMessage = ''
    }
    var requestData = {
      star: $scope.selectedRating,
      productId: id,
      message: $scope.messageContent,
    };

    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/save-comment",
    }).then(function (response) {
      $scope.messageContent = ''
      $scope.handleRatingChange = undefined
      Swal.fire({
        title: "Thành công!",
        text: "Bình luận sản phẩm thành công!",
        icon: "success"
      });
      $scope.message(id)
    });
  }
  $scope.handleRatingChange = function (selectedRating) {
    console.log("Người dùng đã chọn " + selectedRating + " sao");
    $scope.selectedRating = selectedRating; // Gán giá trị của selectedRating vào $scope.selectedRating
  }
  ///------------------------------------------------------------------------------

  $http({
    method: "GET",
    url: "http://localhost:8080/api/v1/auth/twobee/products/" + id,
  }).then(
    function successCallback(response) {
      $scope.detailsProductId1 = response.data;
      //comment Product
      var productId = $scope.detailsProductId1.productId;
      $scope.message(productId);
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );


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
  ////////////////////getAll productImages
  $scope.images = {}
  $http({
    method: "GET",
    url: "http://localhost:8080/api/v1/auth/images",
  }).then(
    function successCallback(response) {
      $scope.images = response.data;

    },
    function errorCallback(response) {
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
    url: "http://localhost:8080/api/v1/auth/discount",
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
      title: "Xóa sản phẩm",
      text: "Bạn có muốn xóa sản phẩm ra khỏi giỏ hàng",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!"
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
    angular.forEach($scope.carts, function (cart) {
      if (selectedOptions.includes(String(cart.cartId))) {
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
      } else {
        $scope.totalCartAll = $scope.totalCartValue
        $scope.discountTitle = ''
        $scope.discount = ''
      }
      $scope.freeShip = '25,000 VNĐ';
      $scope.totalCartAll = $scope.totalCartAll + 25000
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
      console.table($scope.carts)
      cart.quantity = cart.product.quantityInStock
      return;
    } else if (cart.quantity < 1) {
      Swal.fire({
        title: "Lỗi!",
        text: "Số lượng phải lớn hơn 0",
        icon: "error"
      });
      cart.quantity = 1
    }
    // $scope.updateCart(cart);
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
      $scope.updateCart(cart);
      $scope.updatePrice(cart);
    } else {
      Swal.fire({
        title: "Lỗi!",
        text: "Số lượng phải lớn hơn 0!",
        icon: "error"
      });
    }
  };

  //////////////////////////////////////////////////////////////saveCartCheckOut
  $scope.saveCartCheckOut = function (detailsProductId1) {
    var selectedColorId = $scope.selectedColorDetailsProduct[detailsProductId1.productId];
    if (selectedColorId === undefined || selectedColorId == '') {
      $scope.errorSelectedColorId = '(*) Vui lòng chọn màu'
      return;
    } else {
      $scope.errorSelectedColorId = ''
    }
    var selectedSizeId = $scope.selectedDetailsSizeId[detailsProductId1.productId];
    if (selectedSizeId === undefined || selectedSizeId == '') {
      $scope.errorSelectedSizeId = '(*) Vui lòng chọn size'
      return;
    } else {
      $scope.errorSelectedSizeId = ''
    }
    if (parseInt(detailsProductId1.quantityInStock) - parseInt($scope.quantityProduct) < 0) {
      Swal.fire({
        title: "Thất bại!",
        text: "Số lượng bạn nhập vào không được vượt qua số lượng hàng tồn kho",
        icon: "error",
      });
      var result = document.getElementById('sst_quantity');
      var sst = parseInt(result.value);
      if (!isNaN(sst)) {
        result.value = detailsProductId1.quantityInStock;
        // Đảm bảo cập nhật giá trị trong model
        angular.element(result).triggerHandler('input');
      }
      return;
    }
    if (detailsProductId1.quantityInStock <= 0) {
      Swal.fire({
        title: "Thất bại!",
        text: "Sản phẩm này đã hết hàng!",
        icon: "error"
      });
      return;
    }
    var requestData = {
      productId: detailsProductId1.productId,
      quantity: $scope.quantityProduct,
      userId: null,
      colorId: parseInt(selectedColorId),
      imageId: null,
      sizeId: parseInt(selectedSizeId)
    };

    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/create-cart",
    }).then(function (response) {
      $scope.cartCheckOut = response.data
      localStorage.setItem('checkCartId', String($scope.cartCheckOut.cartId) + ',')
      Swal.fire({
        title: "Xác nhận đơn hàng!",
        html: "Đang chờ xác nhận đơn hàng <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          $('#quantity_in_stock').html(parseInt(detailsProductId1.quantityInStock) - parseInt($scope.quantityProduct));
          $scope.loadData();
          detailsProductId1.quantityInStock = (parseInt(detailsProductId1.quantityInStock) - parseInt($scope.quantityProduct));

          window.location.href = "/index.html#!/shop/checkout";
        }
      });


    });
  };
  //Thêm mới sản phầm vào giỏ hàng
  $scope.saveCart = function (detailsProductId1) {
    var selectedColorId = $scope.selectedColorDetailsProduct[detailsProductId1.productId];
    if (selectedColorId === undefined || selectedColorId == '') {
      $scope.errorSelectedColorId = '(*) Vui lòng chọn màu'
      return;
    } else {
      $scope.errorSelectedColorId = ''
    }
    var selectedSizeId = $scope.selectedDetailsSizeId[detailsProductId1.productId];
    if (selectedSizeId === undefined || selectedSizeId == '') {
      $scope.errorSelectedSizeId = '(*) Vui lòng chọn size'
      return;
    } else {
      $scope.errorSelectedSizeId = ''
    }
    if (parseInt(detailsProductId1.quantityInStock) - parseInt($scope.quantityProduct) < 0) {
      Swal.fire({
        title: "Thất bại!",
        text: "Số lượng bạn nhập vào không được vượt qua số lượng hàng tồn kho",
        icon: "error",
      });
      var result = document.getElementById('sst_quantity');
      var sst = parseInt(result.value);
      if (!isNaN(sst)) {
        result.value = detailsProductId1.quantityInStock;
        // Đảm bảo cập nhật giá trị trong model
        angular.element(result).triggerHandler('input');
      }
      return;
    }
    if (detailsProductId1.quantityInStock <= 0) {
      Swal.fire({
        title: "Thất bại!",
        text: "Sản phẩm này đã hết hàng!",
        icon: "error"
      });
      return;
    }
    var requestData = {
      productId: detailsProductId1.productId,
      quantity: $scope.quantityProduct,
      userId: null,
      colorId: parseInt(selectedColorId),
      imageId: null,
      sizeId: parseInt(selectedSizeId)
    };
    $http({
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
      },
      data: JSON.stringify(requestData),
      url: "http://localhost:8080/api/v1/create-cart",
    }).then(function (response) {
      Swal.fire({
        title: "Thành công!",
        text: "Thêm vào giỏ hàng thành công",
        icon: "success",
      });
      $('#quantity_in_stock').html(parseInt(detailsProductId1.quantityInStock) - parseInt($scope.quantityProduct));
      $scope.loadData();
      detailsProductId1.quantityInStock = (parseInt(detailsProductId1.quantityInStock) - parseInt($scope.quantityProduct));
    });
  };
}

function increaseQuantity() {
  var result = document.getElementById('sst_quantity');
  var sst = parseInt(result.value);
  if (!isNaN(sst)) {
    result.value++;
    // Đảm bảo cập nhật giá trị trong model
    angular.element(result).triggerHandler('input');
  }
}

function decreaseQuantity() {
  var result = document.getElementById('sst_quantity');
  var sst = parseInt(result.value);
  if (!isNaN(sst) && sst > 0) {
    result.value--;
    // Đảm bảo cập nhật giá trị trong model
    angular.element(result).triggerHandler('input');
  }
}
