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