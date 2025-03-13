
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.error('Service Worker registration failed!', err));
    });
}

import apiHandler from "./utils/apiHandler.mjs";


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
};


const startTimer = () => {
    isPaused = false;
    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    alert('Tid er ute! Ta en pause!');
                    storeSession("work");
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

 
    const focusTime = (25 * 60) - (minutes * 60 + seconds);
    const parsedFocusTime = Number.isInteger(focusTime) ? focusTime : parseInt(focusTime, 10);

    console.log("🟢 DEBUG - Storing session:", { userId, parsedFocusTime });

    try {
        const response = await apiHandler.createPomodoro(userId, parsedFocusTime);
        console.log("🟢 Session stored:", response);
        loadHistory(); // Update the history immediately
    } catch (error) {
        console.error("❌ ERROR - Storing session:", error);
    }
};


const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;

    if (minutes !== 25 || seconds !== 0) {
        storeSession("work"); 
    }

    minutes = 25;
    seconds = 0;
    isPaused = false;
    startPauseButton.textContent = 'Start';
    updateDisplay();
};


function openHistory() {
    const historyMenu = document.getElementById("history-menu");
    historyMenu.style.display = "block"; // Make it visible
    setTimeout(() => historyMenu.classList.add("show"), 10); 
    loadHistory();
}


function closeHistory() {
    const historyMenu = document.getElementById("history-menu");
    historyMenu.classList.remove("show"); // Slide out
    setTimeout(() => historyMenu.style.display = "none", 300); 
}


async function loadHistory() {
    const userId = localStorage.getItem("user_id") || "guest";
    const historyContainer = document.getElementById("today-history");

    try {
        const sessions = await apiHandler.getTodaySessions(userId);
        historyContainer.innerHTML = "";

        if (sessions.length === 0) {
            historyContainer.innerHTML = "<p>No sessions yet today.</p>";
            return;
        }

        sessions.forEach(session => {
            const div = document.createElement("div");
            div.textContent = `🕒 ${new Date(session.start_time).toLocaleTimeString()} - ${session.total_minutes} min`;
            historyContainer.appendChild(div);
        });
    } catch (error) {
        console.error("❌ ERROR - Loading history:", error);
        historyContainer.innerHTML = "<p>Error loading history.</p>";
    }
}


startPauseButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);
document.getElementById("history-btn").addEventListener("click", openHistory);


updateDisplay();

