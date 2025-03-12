const API_BASE = "http://localhost:8000/api/pomodoro"; // Change this when deploying to Render

async function createPomodoro(userId, focusTime, breakTime) {
    console.log("Sending session data:", { user_id: userId, focus_time: focusTime, break_time: breakTime }); // ✅ Debugging log

    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, focus_time: focusTime, break_time: breakTime })  // ✅ Ensure user_id, focus_time, and break_time are sent
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to store session");
        }
        return data;
    } catch (error) {
        console.error("API Error:", error);
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

export default { createPomodoro, getPomodoroHistory };
