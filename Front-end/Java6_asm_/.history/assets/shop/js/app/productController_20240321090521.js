console('ProductController')
app.controller('ProductController', function ($scope, $http) {
    let url = "http://localhost:8080//api/v1/products"
    $http.get(url).then(respone => {
        console.log("success", respone.data);
    }).catch(err => {
        console.log("error", err);
    })
})