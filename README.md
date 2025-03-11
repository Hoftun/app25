# Pomodoro Timer ⏰🐾 

Feeling pawsitively unproductive? Need some purr-suasion to stay on track?  
Introducing the **Pomodoro Timer**, now with 100% more cat! Because who wouldn’t want a fluffy little motivator lounging on top of their timer? 😸

This isn’t just any productivity tool; it’s a **meow-nificent** way to boost your focus and break down your tasks into bite-sized intervals. Built as a **Progressive Web App (PWA)**, you can even add it to your home screen—no cat hair included!

---

## 🎮 Live Demo  
Check out the live version here and get ready to claw through that to-do list:  
[https://app25.onrender.com](https://app25.onrender.com)  

This version is **deployed on Render**, and now you can use it on the go—no need for local servers anymore! 🎉  
The API is now fully integrated with a **PostgreSQL database** hosted on **Render** to persist Pomodoro session data.

---

## ⏳ How It Works  
The Pomodoro technique helps improve focus by working in **25-minute sessions** followed by **5-minute breaks**.  
Here’s how this Pomodoro Timer works:  

1. Click **"Start"** to begin a **25-minute work session**.  
2. When the timer ends, take a **short break**.  
3. Repeat the process to stay productive!  
4. If you need to **pause** or **reset**, just use the buttons below the timer.  

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
- A cat sits on top of the timer to judge (or support) your progress. It’s motivational... in its own feline way.  
- Configurable durations for both work and break intervals, because even cats need a catnap. 💤  
- **Offline Support:** Works even without internet—unlike your cat, who still expects you to Google ‘why does my cat judge me?’  
- **Add to Home Screen:** Installable as a PWA on mobile and desktop—no kitty litter required.  
- Dynamic feature flags with custom middleware, because why not?  
- **RESTful API** for managing Pomodoro sessions, now with **PostgreSQL database integration** on **Render**. The app stores session data and works seamlessly with your PostgreSQL instance on Render. (No, the cat can’t delete your tasks, sorry.)  

---

## 🛠️ Technologies Used  
- **Node.js** – Backend runtime environment  
- **Express.js** – Web server framework  
- **PostgreSQL** – Database used to persist Pomodoro session history (now hosted on Render).  
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
bash
Copy
npm install
3. Set up environment variables
Create a .env file in the root of the project and add your PostgreSQL connection string from Render:

dotenv
Copy
DATABASE_URL=postgresql://<username>:<password>@<hostname>.render.com:5432/<database_name>
You can get this connection string from the Render Dashboard under your PostgreSQL service.

4. Run the app locally
bash
Copy
npm start
Now you can access the Pomodoro Timer at http://localhost:8000! ```

- Ingrid