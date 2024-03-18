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
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        correctAnswer: "Mars"
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
        <p>${index + 1}. ${question.question}</p>
        ${optionsHtml}
    `;

    questionContainer.innerHTML = questionHtml;
    showQuestionNumber.innerHTML =showQuestionHtml;
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
        questionContainer.innerHTML = `<p>Kết thúc. Bạn đạt được ${score}/${questions.length} câu đúng</p>`;
        nextButton.disabled = true;
        scoreButton.textContent = `${currentQuestionIndex}/${questions.length}`;
        showQuestionNumber.innerHTML =showQuestionHtml;
    }
}
nextButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (checkAnswer(currentQuestionIndex)) {
        currentQuestionIndex++;
        score++;
        alert(score);
        checkQuestionFinish(currentQuestionIndex);
    } else {
        currentQuestionIndex++;
        score = score;
        alert(score);
        checkQuestionFinish(currentQuestionIndex);
    }
});


displayQuestion(currentQuestionIndex);