if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.error('Service Worker registration failed!', err));
    });
}

import apiHandler from "./utils/apiHandler.mjs";

const API_FEATURES = window.location.hostname === "localhost"
    ? "http://localhost:8000/api/features"
    : "https://app25.onrender.com/api/features";

let minutes = 25;
let seconds = 0;
let timerInterval;
let isPaused = false;

const updateDisplay = () => {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
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
        document.getElementById('startPause').textContent = isPaused ? 'Start' : 'Pause';
    } else {
        startTimer();
        document.getElementById('startPause').textContent = 'Pause';
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
        loadHistory();
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
    document.getElementById('startPause').textContent = 'Start';
    updateDisplay();
};

async function openHistory() {
    try {
        
        const response = await fetch(API_FEATURES);
        const flags = await response.json();

        console.log("🟢 DEBUG - Feature Flags Received:", flags);

        if (!flags.showHistorySidebar) {
            alert("History sidebar is currently disabled!");
            return;
        }

        const historyMenu = document.getElementById("history-menu");
        const historyButton = document.getElementById("history-btn");

        if (historyMenu && historyButton) {
            historyMenu.style.display = "block";
            historyButton.style.display = "none";

            setTimeout(() => historyMenu.classList.add("show"), 10);
            loadHistory();
        }
    } catch (error) {
        console.error("❌ ERROR - Fetching feature flags:", error);
    }
}

function closeHistory() {
    const historyMenu = document.getElementById("history-menu");
    const historyButton = document.getElementById("history-btn");

    if (historyMenu && historyButton) {
        historyMenu.classList.remove("show");
        setTimeout(() => {
            historyMenu.style.display = "none";
            historyButton.style.display = "block";
        }, 300);
    }
}

async function loadHistory() {
    const userId = localStorage.getItem("user_id") || "guest";
    const historyContainer = document.getElementById("today-history");

    if (!historyContainer) return;

    try {
        const sessions = await apiHandler.getTodaySessions(userId);
        historyContainer.innerHTML = "";

        if (sessions.length === 0) {
            historyContainer.innerHTML = "<p>No sessions yet today.</p>";
            return;
        }

        sessions.forEach(session => {
            let storedDate = new Date(session.start_time);

            const formattedTime = storedDate.toLocaleTimeString("no-NO", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });

            const div = document.createElement("div");
            div.textContent = `🕒 ${formattedTime} - ${session.total_minutes} min`;
            historyContainer.appendChild(div);
        });

    } catch (error) {
        console.error("❌ ERROR - Loading history:", error);
        historyContainer.innerHTML = "<p>Error loading history.</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startPause")?.addEventListener('click', toggleStartPause);
    document.getElementById("reset")?.addEventListener('click', resetTimer);
    document.getElementById("history-btn")?.addEventListener("click", openHistory);
    document.getElementById("close-history")?.addEventListener("click", closeHistory);
});

updateDisplay();
