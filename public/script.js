// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.error('Service Worker registration failed!', err));
    });
}

// Import the API handler to store session data
import apiHandler from "./utils/apiHandler.mjs";

// Timer variables
let minutes = 25;
let seconds = 0;
let timerInterval;
let isPaused = false;

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');

// Update the timer display
const updateDisplay = () => {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
};

// Start the timer
const startTimer = () => {
    isPaused = false;
    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    alert('Tid er ute! Ta en pause!');
                    storeSession("work"); // Store the completed session
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
};


const toggleStartPause = () => {
    if (timerInterval) {
        isPaused = !isPaused;
        startPauseButton.textContent = isPaused ? 'Start' : 'Pause';
    } else {
        startTimer();
        startPauseButton.textContent = 'Pause';
    }
};

const storeSession = async (sessionType) => {
    const userId = localStorage.getItem("user_id") || "guest";

    // Ensure `focus_time` is calculated in seconds
    const focusTime = (25 * 60) - (minutes * 60 + seconds);
    const parsedFocusTime = Number.isInteger(focusTime) ? focusTime : parseInt(focusTime, 10);

    console.log("🟢 DEBUG - Storing session:", { userId, parsedFocusTime });

    try {
        const response = await apiHandler.createPomodoro(userId, parsedFocusTime);
        console.log("🟢 Session stored:", response);
    } catch (error) {
        console.error("❌ ERROR - Storing session:", error);
    }
};


// Reset the timer (and store session if it was running)
const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;

    if (minutes !== 25 || seconds !== 0) {
        storeSession("work"); // Store the session before resetting
    }

    minutes = 25;
    seconds = 0;
    isPaused = false;
    startPauseButton.textContent = 'Start';
    updateDisplay();
};

// Event Listeners for the buttons
startPauseButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);

// Initial display update
updateDisplay();
