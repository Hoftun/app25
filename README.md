# Pomodoro Timer ⏰🐾 

Feeling pawsitively unproductive? Need some purr-suasion to stay on track?  
Introducing the **Pomodoro Timer**, now with 100% more cat! Because who wouldn’t want a fluffy little motivator lounging on top of their timer? 😸

This isn’t just any productivity tool; it’s a **meow-nificent** way to boost your focus and break down your tasks into bite-sized intervals. Built as a **Progressive Web App (PWA)**, you can even add it to your home screen—no cat hair included!

---

## 🎮 Live Demo  
Check out the live version here and get ready to claw through that to-do list:  
[https://app25.onrender.com](https://app25.onrender.com)  

This version is **deployed on Render**, and now you can use it on the go—no need for local servers anymore! 🎉  
The API is fully integrated with a **PostgreSQL database** hosted on **Render**, so your Pomodoro session history is **saved automatically**.

---

## ⏳ How It Works  
The Pomodoro technique helps improve focus by working in **25-minute sessions** followed by **5-minute breaks**.  
Here’s how this Pomodoro Timer works:  

1. Click **"Start"** to begin a **25-minute work session**.  
2. When the timer ends, take a **short break**.  
3. Repeat the process to stay productive!  
4. If you need to **pause** or **reset**, just use the buttons below the timer.  
5. **Session history is automatically stored**—check your past Pomodoros anytime.  

---

## 📊 Viewing Your Pomodoro History  
Every completed session is **stored in a PostgreSQL database**, allowing you to track your productivity over time.  
Here’s what you can view:  
- **Today's History** – A list of all your Pomodoro sessions from today, including their durations.  
- **Lifetime Stats** – Total Pomodoro sessions completed and total focused time stored in the database.  

You can check your history on the **app’s dashboard** or through the API.  

📌 **API Endpoints:**  
- **GET `/api/pomodoro/today/:user_id`** → Fetch today’s Pomodoro history.  
- **GET `/api/pomodoro/stats/:user_id`** → Get total completed sessions and focus time.  

---

## 📱 PWA Features  
This app is a **Progressive Web App (PWA)**, meaning you can install it on your device for quick access.  

### ✅ How to Install:  
1. **Desktop (Chrome & Edge):** Click the **install icon** in the address bar.  
2. **Mobile (Android & iOS):** Open the site in **Chrome/Safari**, tap **"Add to Home Screen."**  
3. The app will now work **even without internet!** 🎉  

---

## ✨ Features  
- Start, pause, and reset timers for work sessions and breaks—paw-sitively purr-fect for productivity.  
- **Session history is now stored and accessible anytime.**  
- **View today’s Pomodoro history and track lifetime stats** 📊.  
- A cat sits on top of the timer to judge (or support) your progress. It’s motivational... in its own feline way.  
- **Offline Support:** Works even without internet—unlike your cat, who still expects you to Google ‘why does my cat judge me?’  
- **Add to Home Screen:** Installable as a PWA on mobile and desktop—no kitty litter required.  
- Dynamic feature flags with custom middleware, because why not?  
- **RESTful API** for managing Pomodoro sessions, now with **PostgreSQL database integration** on **Render**.  

---

## 🛠️ Technologies Used  
- **Node.js** – Backend runtime environment  
- **Express.js** – Web server framework  
- **PostgreSQL** – Database used to persist Pomodoro session history (hosted on Render).  
- **Progressive Web App (PWA)** – Offline support and installable UI  
- **Service Workers** – Caching for offline functionality  
- **Feature Flag Middleware** – Dynamic feature toggling  
- **Postman** – API testing  
- **Favicon.io** – Used to create the site’s favicon  
- **Cat GIFs** – To maximize productivity and cuteness  

---

## 🚀 Installation and Setup  
Wanna paws and play with it locally? Here’s how to get it up and running:

### 1. Clone the repository  
```bash
git clone https://github.com/Hoftun/app25
cd app25

2. Install dependencies

npm install

3. Set up environment variables
Create a .env file in the root of the project and add your PostgreSQL connection string from Render:

DATABASE_URL=postgresql://<username>:<password>@<hostname>.render.com:5432/<database_name>
API_BASE_URL="https://app25.onrender.com/api"

You can get this connection string from the Render Dashboard under your PostgreSQL service.

4. Run the app locally

npm start

Now you can access the Pomodoro Timer at http://localhost:8000! 🎉

✨ Feature Flags: Enabling/Disabling the History Sidebar

The History Sidebar can be toggled on or off dynamically using feature flags via the API. Here’s how to change its state:

Disabling the History Sidebar:
Run this curl command to turn OFF the sidebar:

curl -X POST http://localhost:8000/api/features -H "Content-Type: application/json" -d '{"feature": "showHistorySidebar", "enabled": false}'
Enabling the History Sidebar:
Run this curl command to turn ON the sidebar:

curl -X POST http://localhost:8000/api/features -H "Content-Type: application/json" -d '{"feature": "showHistorySidebar", "enabled": true}'

You can also enable/disable it via Postman:
1. POST request to http://localhost:8000/api/features
2. Body (raw, JSON format):

{
    "feature": "showHistorySidebar",
    "enabled": true
}

🐾 Contributing
Feel free to submit issues, PRs, or cat memes. Open-source projects thrive on collaboration!

🐱 Happy Pomodoro-ing!

Ingrid