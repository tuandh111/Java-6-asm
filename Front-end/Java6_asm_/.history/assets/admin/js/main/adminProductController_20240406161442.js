console.log('AdminProductController')

app.controller('AdminProductController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080/api/v1/management/twobee"
    let headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
    }

    $scope.filenames = []
    $scope.infoProductRelative = []
    $scope.selectedBrands = [];
    $scope.selecteColors = [];
    $scope.selecteSizes = [];


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

    $http.listInfo = function () {
        $http.get(url + '/products', { headers: headers }).then(response => {
            $scope.infoProductRelative = response.data
            console.log("$scope.infoProductRelative", response.data);
        }).catch(error => {
            console.log("error", error);
        })
    }

    $scope.listImg();
    $http.listInfo();
})

