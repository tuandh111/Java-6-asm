console.log('ProductController')
app.controller('ProductController', function ($scope, $http) {
    let url = "http://localhost:8080/api/v1/products"
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cnVuMjg5NEBnbWFpbC5jb20iLCJpYXQiOjE3MTA5Mjc3OTAsImV4cCI6MTcxMTAxNDE5MH0.J8zeXzlLMs3S7MnngoOsWctjBo5u-snj7tI2hGC-km4";
    let headers = {
        'Authorization': 'Bearer ' + token
    };
    $http.get(url, { headers: headers }).then(respone => {
        console.log("success", respone.data);
    }).catch(err => {
        console.log("error", err);
    })

})