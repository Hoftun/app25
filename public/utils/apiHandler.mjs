const API_BASE = window.location.hostname === "localhost"
    ? "http://localhost:8000/api/pomodoro"  
    : "https://app25.onrender.com/api/pomodoro"; 

async function createPomodoro(userId = "guest", focusTime) {
    
    const parsedFocusTime = Number.isInteger(focusTime) ? focusTime : parseInt(focusTime, 10);

    if (isNaN(parsedFocusTime) || parsedFocusTime <= 0) {
        console.error("❌ ERROR - Invalid focus_time value:", parsedFocusTime);
        return null;
    }

    console.log("🟢 DEBUG - Sending session data:", { user_id: userId, focus_time: parsedFocusTime });

    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                focus_time: parsedFocusTime
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to store session");
        }
        return data;
    } catch (error) {
        console.error("❌ API ERROR:", error);
        return null;
    }
}

async function getPomodoroHistory() {
    try {
        const response = await fetch(API_BASE, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch history");
        }
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

async function getTodaySessions(userId) {
    try {
        const response = await fetch(`${API_BASE}/today/${userId}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching today's history:", error);
        return [];
    }
}

async function getLifetimeStats(userId) {
    try {
        const response = await fetch(`${API_BASE}/stats/${userId}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching lifetime stats:", error);
        return { total_sessions: 0, total_minutes: 0 };
    }
}

export default { createPomodoro, getPomodoroHistory, getTodaySessions, getLifetimeStats };
