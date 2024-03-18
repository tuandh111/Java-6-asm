document.addEventListener("DOMContentLoaded", function() {
    const timerDisplay = document.getElementById('timer');
    const countdown = 100; // 10 minutes 
    let timeLeft = countdown;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft === 0) {
            clearInterval(interval);
            timerDisplay.innerHTML = "Hết giờ!";
        } else {
            timeLeft--;
        }
    }

    updateTimer(); // Initial display

    const interval = setInterval(updateTimer, 1000); // Update the timer every 1 second
});

// Quiz
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

let currentQuestionIndex = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const scoreButton = document.getElementById("score-button"); // mới thêm
const showQuestionNumber = document.getElementById("questionNumber");
let score = 0;

function displayQuestion(index) {
    const question = questions[index];
    const showQuestionHtml =question.question;
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
    //showQuestionNumber.innerHTML =showQuestionHtml;
    scoreButton.textContent = `${currentQuestionIndex}/${questions.length}`;
}

function checkAnswer(index) {
    const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
    if (!selectedOption) return false;

    return selectedOption.value === questions[index].correctAnswer;
}

function checkQuestionFinish(currentQuestionIndex){
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        questionContainer.innerHTML = `<h5>Kết thúc. Bạn đạt được ${score}/${questions.length} câu đúng</h5>`;
        nextButton.disabled = true;
        scoreButton.textContent = `${currentQuestionIndex}/${questions.length}`;
       // showQuestionNumber.innerHTML =showQuestionHtml;
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

displayQuestion(currentQuestionIndex);