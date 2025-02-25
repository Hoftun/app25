let minutes = 25;
let seconds = 0;
let timerInterval;
let isPaused = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');

const updateDisplay = () => {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

const startTimer = () => {
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

const toggleStartPause = () => {
    if (timerInterval) {
        isPaused = !isPaused;
        startPauseButton.textContent = isPaused ? 'Start' : 'Pause';
    } else {
        startTimer();
        startPauseButton.textContent = 'Pause';
    }
}

const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    minutes = 25;
    seconds = 0;
    isPaused = false;
    startPauseButton.textContent = 'Start';
    updateDisplay();
}

startPauseButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);

updateDisplay();


