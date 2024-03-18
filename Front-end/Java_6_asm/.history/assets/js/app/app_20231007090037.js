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
        .when("/blog", {
            templateUrl: "templates/blog.html",
        })
        .when("/question", {
            templateUrl: "templates/question.html",
            controller: QuestionController
        })
        // .when("/detailCourse/:id", {
        //     templateUrl: "templates/detailCourse.html",
        //     controller: detailController
        // })
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
    let user = {
        username: 'A',
        password: '123'
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
//Not complete yet
//End: Đăng nhập

// Start: danh sách khóa học
function ProductController($scope) {
    $scope.products = [
        {
            id:1,
            image: "assets/logos/1.png",
            title: "Lập trình Android cơ bản",
            textDescription: "Lập trình Android cơ bản"
        },
        {
            id:2,
            image: "assets/logos/2.png",
            title: "Lập trình Android nâng cao",
            textDescription: "Lập trình Android nâng cao"
        },
        {
            id:3,
            image: "assets/logos/3.png",
            title: "Kiểm thử ứng dụng Android",
            textDescription: "Kiểm thử ứng dụng Android"
        },
        {
            id:4,
            image: "assets/logos/4.png",
            title: "Thiết kế UI trên Android",
            textDescription: "Thiết kế UI trên Android"
        },
        {
            id:5,
            image: "assets/logos/5.png",
            title: "Lập trình ASP.NET",
            textDescription: "Lập trình ASP.NET"
        },
        {
            id:6,
            image: "assets/logos/6.png",
            title: "Điện toán đám mây",
            textDescription: "Điện toán đám mây"
        },
        {
            id:7,
            image: "assets/logos/7.png",
            title: "SQL Server",
            textDescription: "SQL Server"
        },
        {
            id:8,
            image: "assets/logos/8.png",
            title: "SQL Server",
            textDescription: "SQL Server"
        },
        {
            id:9,
            image: "assets/logos/9.png",
            title: "Cơ sở dữ liệu",
            textDescription: "Cơ sở dữ liệu"
        },
        {
            id:10,
            image: "assets/logos/10.png",
            title: "Lập trình game 2D",
            textDescription: "Lập trình game 2D"
        },
        {
            id:11,
            image: "assets/logos/11.png",
            title: "HTML5 và CSS3",
            textDescription: "HTML5 và CSS3"
        },
        {
            id:12,
            image: "assets/logos/12.png",
            title: "Internet Marketing",
            textDescription: "Internet Marketing"
        },
        {
            id:13,
            image: "assets/logos/13.png",
            title: "Lập trình Java nâng cao",
            textDescription: "Lập trình Java nâng cao"
        },
        {
            id:14,
            image: "assets/logos/14.png",
            title: "Lập trình OOP với Java",
            textDescription: "Lập trình OOP với Java"
        },
        {
            id:15,
            image: "assets/logos/14.png",
            title: "Lập trình JavaScript",
            textDescription: "Lập trình JavaScript"
        },
        {
            id:16,
            image: "assets/logos/15.png",
            title: "Thiết kế layout",
            textDescription: "Thiết kế layout"
        },
        {
            id:17,
            image: "assets/logos/16.png",
            title: "Thiết kế web cho di động",
            textDescription: "Thiết kế web cho di động"
        },
        {
            id:18,
            image: "assets/logos/17.png",
            title: "Lập trình PHP",
            textDescription: "Lập trình PHP"
        },
        {
            id:19,
            image: "assets/logos/18.png",
            title: "Quản lý dự án với Agile",
            textDescription: "Quản lý dự án với Agile"
        },
        {
            id:20,
            image: "assets/logos/19.png",
            title: "Lập trình VB.NET",
            textDescription: "Lập trình VB.NET"
        },
        {
            id:21,
            image: "assets/logos/20.png",
            title: "Xây dựng trang web",
            textDescription: "Xây dựng trang web"
        }
    ]
    $scope.showDetails=function($scope, $routeParams) {
        alert($routeParams.id)
    }

}
//End: Danh sách khóa học

//Bảng câu hỏi
function QuestionController($scope, $timeout) {
    // Declare variables
    const timerDisplay = document.getElementById('timer');
    const questionContainer = document.getElementById("question-container");
    const nextButton = document.getElementById("next-button");
    const scoreButton = document.getElementById("score-button");
    const statusQuestion = document.getElementById("status-question");

    let currentQuestionIndex = 0;
    let score = 0;
    $scope.countdown = 30; // fixed for performance
    let timeLeft = $scope.countdown;

    const questions = [
        {
            question: "Bạn Tên là gì?",
            options: ["Nguyễn Thành Trung", "Lê Văn Minh", "Trịnh Thị Nhì", "Nguyễn Thị Hồng"],
            correctAnswer: "Nguyễn Thành Trung"
        },
        {
            question: "Bạn đang học trường gì?",
            options: ["FPT Polytechnic Cần Thơ", "Đại học Cần Thơ", "Đại học Tây Đô", "Đại học Nam Cần Thơ"],
            correctAnswer: "FPT Polytechnic Cần Thơ"
        },
        {
            question: "Mã số sinh viên của Bạn là?",
            options: ["PC05677", "PC05467", "PC09125", "PC05132"],
            correctAnswer: "PC05132"
        },
        {
            question: "Bạn sinh năm bao nhiêu?",
            options: ["2006", "2002", "1999", "2004"],
            correctAnswer: "1999"
        },
        {
            question: "Quê hương của bạn ở đâu?",
            options: ["Vĩnh Long", "An Giang", "Bạc Liêu", "Cần Thơ"],
            correctAnswer: "An Giang"
        },
        {
            question: "Bạn đang học ngành gì?",
            options: ["Thiết kế đồ họa", "Phát triển phần mềm", "Marketing and SEO", "Kinh tế học"],
            correctAnswer: "Phát triển phần mềm"
        },
        // Add more questions in the same format
    ];

    //Start: Time to Quiz
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft === 0) {
            clearInterval(interval);
            timerDisplay.innerHTML = "Hết giờ!";
            // Update: Hiển thị kết quả làm bài khi hết giờ
            updateResults();
        } else {
            timeLeft--;
        }
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    //End: Time to Quiz

    function displayQuestion(index) {
        const question = questions[index];
        const optionsHtml = question.options.map((option, i) => `
            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="q${index + 1}a${i + 1}" name="q${index + 1}" value="${option}">
                <label class="custom-control-label" for="q${index + 1}a${i + 1}">${option}</label>
            </div>
        `).join("");

        const questionHtml = `
            <h5>${index + 1}. ${question.question}</h5>
            ${optionsHtml}
        `;
        questionContainer.innerHTML = questionHtml;
        statusQuestion.innerHTML = `<h6>Câu ${currentQuestionIndex + 1} trong ${questions.length}</h6>`;
        scoreButton.textContent = `Score: ${score}/${questions.length}`;
    }

    function checkAnswer(index) {
        const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (!selectedOption.checked) { return }
        else if (!selectedOption) { return false }
        else { return selectedOption.value === questions[index].correctAnswer };
    }

    function checkQuestionFinish(currentQuestionIndex) {
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            updateResults();
        }
    }

    nextButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (checkAnswer(currentQuestionIndex)) {
            currentQuestionIndex++;
            score++;
            checkQuestionFinish(currentQuestionIndex);
        } else {
            currentQuestionIndex++;
            score = score;
            checkQuestionFinish(currentQuestionIndex);
        }
    });

    function updateResults() {
        questionContainer.innerHTML = `<h5>Kết thúc. Bạn đạt được ${score}/${questions.length} câu đúng</h5>`;
        nextButton.disabled = true;
        statusQuestion.innerHTML = `<h6>Câu ${currentQuestionIndex} trong ${questions.length}</h6>`;
        scoreButton.textContent = `Score: ${score}/${questions.length}`;
    }
    displayQuestion(currentQuestionIndex);

}
//fix bug, DOM conflict
//End: Question

//detailCourse
function detailController ($scope,$routeParams){

}
