let minutes = 25;
let seconds = 0;
let timerInterval;
let isPaused = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

const updateDisplay = () => {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

const startTimer = () => {
    if (timerInterval) return;
    isPaused = false;
    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    alert('Tid er ute! Ta en pause!');
                    resetTimer();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }
    }, 1000);
}

const pauseTimer = () => {
    isPaused = true;
}

const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    minutes = 25;
    seconds = 0;
    isPaused = false;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();

