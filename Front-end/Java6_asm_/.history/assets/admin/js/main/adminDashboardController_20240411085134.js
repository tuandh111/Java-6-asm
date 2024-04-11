console.log("AdminDashboardController");
app.controller('AdminDashboardController', function ($scope, $http, $rootScope, $location) {
    let url = "http://localhost:8080/api/v1"
    let headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken"),
    }
    $scope.listBrandsFilter = [];
    $scope.listBrandsShow = [];//để chứa kết quả show lên giao diện
    $scope.filteredBrands = [];
    $scope.begin = 0;
    $scope.pageSize = 4;
    $scope.searchBrandsName = '';

    $scope.listProductsFilter = [];
    $rootScope.listProductsFilterByProductId = [];//để chứa kết quả show lên giao diện
    $scope.filteredProducts = [];


    $scope.getCharts = function () {
        $scope.chartArea = function () {
            //add chart
            var labelsCtx = null;
            var valuesCtx = null;
            if (dataInventory != null) {
                labelsCtx = Object.keys(dataInventory);
                valuesCtx = Object.values(dataInventory);
            }
            const ctx = document.getElementById('myAreaChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsCtx,
                    datasets: [{
                        label: '5 Sản phẩm tồn kho thấp nhất',
                        data: valuesCtx,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                }
            });

            var labelsDoughnut = null;
            var valuesDoughnut = null;
            if (dataRevenueByCategory != null) {
                labelsDoughnut = Object.keys(dataRevenueByCategory);
                valuesDoughnut = Object.values(dataRevenueByCategory);
            }

            // const doughnut = document.getElementById('myChartDoughnut');

            // new Chart(doughnut, {
            //     type: 'doughnut',
            //     data: {
            //         labels: labelsDoughnut,
            //         datasets: [{
            //             label: 'Doanh thu',
            //             data: valuesDoughnut,
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         responsive: true,
            //     }
            // });


        }
    }

    $scope.getCharts();
})

