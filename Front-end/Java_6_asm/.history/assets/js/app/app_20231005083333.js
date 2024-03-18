let app = angular.module("learningHub", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html",
            controller: ProductController
        })
        .when("/contact", {
            templateUrl: "templates/contact.html",
        })
        .when("/about", {
            templateUrl: "templates/about.html",
        })
        .when("/question", {
            templateUrl: "templates/question.html",
            controller: QuestionController
        })
        .otherwise({
            redirectTo: "templates/home.html"
        });
});

app
    .controller('LoginControllerHTML', LoginController)
    .controller('ProductControllerHTML', ProductController)
    .controller('QuestionControllerHTML', QuestionController);


// Start: Đăng nhập    
function LoginController($scope) {
    $scope.isLogin = false;
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.students = [
        {
            "username": "teonv",
            "password": "iloveyou",
            "fullname": "Nguyễn Văn Tèo",
            "email": "teonv@fpt.edu.vn",
            "gender": "true",
            "birthday": "1995-12-21",
            "schoolfee": "1500000",
            "marks": "0"
        },
        {
            "username": "pheonv",
            "password": "iloveyou",
            "fullname": "Nguyễn Văn Chí Phèo",
            "email": "pheonv@fpt.edu.vn",
            "gender": "true",
            "birthday": "1985-10-11",
            "schoolfee": "2500000",
            "marks": "0"
        },
        {
            "username": "nopt",
            "password": "iloveyou",
            "fullname": "Phạm Thị Nở",
            "email": "nopt@fpt.edu.vn",
            "gender": "false",
            "birthday": "1993-05-15",
            "schoolfee": "2000000",
            "marks": "0"
        }
    ]
    $scope.login = function () {

    }
}
//End: Đăng nhập

// Start: danh sách khóa học
function ProductController($scope) {
    $scope.products = [
        {
            image: "assets/logos/1.png",
            title: "Lập trình Android cơ bản",
            textDescription: "Lập trình Android cơ bản"
        },
        {
            image: "assets/logos/2.png",
            title: "Lập trình Android nâng cao",
            textDescription: "Lập trình Android nâng cao"
        },
        {
            image: "assets/logos/3.png",
            title: "Kiểm thử ứng dụng Android",
            textDescription: "Kiểm thử ứng dụng Android"
        },
        {
            image: "assets/logos/4.png",
            title: "Thiết kế UI trên Android",
            textDescription: "Thiết kế UI trên Android"
        },
        {
            image: "assets/logos/5.png",
            title: "Lập trình ASP.NET",
            textDescription: "Lập trình ASP.NET"
        },
        {
            image: "assets/logos/6.png",
            title: "Điện toán đám mây",
            textDescription: "Điện toán đám mây"
        },
        {
            image: "assets/logos/7.png",
            title: "SQL Server",
            textDescription: "SQL Server"
        },
        {
            image: "assets/logos/8.png",
            title: "SQL Server",
            textDescription: "SQL Server"
        },
        {
            image: "assets/logos/9.png",
            title: "Cơ sở dữ liệu",
            textDescription: "Cơ sở dữ liệu"
        },
        {
            image: "assets/logos/10.png",
            title: "Lập trình game 2D",
            textDescription: "Lập trình game 2D"
        },
        {
            image: "assets/logos/11.png",
            title: "HTML5 và CSS3",
            textDescription: "HTML5 và CSS3"
        },
        {
            image: "assets/logos/12.png",
            title: "Internet Marketing",
            textDescription: "Internet Marketing"
        },
        {
            image: "assets/logos/13.png",
            title: "Lập trình Java nâng cao",
            textDescription: "Lập trình Java nâng cao"
        },
        {
            image: "assets/logos/14.png",
            title: "Lập trình OOP với Java",
            textDescription: "Lập trình OOP với Java"
        },
        {
            image: "assets/logos/14.png",
            title: "Lập trình JavaScript",
            textDescription: "Lập trình JavaScript"
        },
        {
            image: "assets/logos/15.png",
            title: "Thiết kế layout",
            textDescription: "Thiết kế layout"
        },
        {
            image: "assets/logos/16.png",
            title: "Thiết kế web cho di động",
            textDescription: "Thiết kế web cho di động"
        },
        {
            image: "assets/logos/17.png",
            title: "Lập trình PHP",
            textDescription: "Lập trình PHP"
        },
        {
            image: "assets/logos/18.png",
            title: "Quản lý dự án với Agile",
            textDescription: "Quản lý dự án với Agile"
        },
        {
            image: "assets/logos/19.png",
            title: "Lập trình VB.NET",
            textDescription: "Lập trình VB.NET"
        },
        {
            image: "assets/logos/20.png",
            title: "Xây dựng trang web",
            textDescription: "Xây dựng trang web"
        }
    ]
}
//End: Danh sách khóa học

//Bảng câu hỏi
function QuestionController($scope,$timeout) {
    const timerDisplay = document.getElementById('timer');
    $scope.countdown = 30; //  
    function updateCountdown() {
        if ($scope.countdown > 0) {
          $scope.countdown--;
          $timeout(updateCountdown, 1000); // Call this function again after 1 second
        } else {
          // Countdown has reached zero, you can perform any action here
          timerDisplay.innerHTML="Hết giờ!";
        }
      }
    
      // Start the countdown initially
      updateCountdown();
}
