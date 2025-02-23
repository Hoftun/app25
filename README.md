# Application development 2 Portefolio 2025
This is what i have worked on in the subject Application development 2 this semester 2025. 

## Installation

Instructions for how to install and set up the project.

```bash

git clone https://github.com/Hoftun/app2025
cd app2025

## Feature Flag Middleware
Prosjektet inkluderer et middleware for dynamisk feature flagging.  
For detaljert bruk og testing, se [FEATURE_FLAGS.md](FEATURE_FLAGS.md).


## Pomodoro Timer API

This project now includes a RESTful API for managing Pomodoro Timer sessions.

### Public URL:
[https://app25.onrender.com](https://app25.onrender.com)

### Endpoints:
- **POST** `/api/pomodoro` – Create a new session
  - Example Request Body:
    ```json
    {
      "type": "work",
      "duration": 1500
    }
    ```
- **GET** `/api/pomodoro` – Get all sessions
- **GET** `/api/pomodoro/:id` – Get session by ID
- **PUT** `/api/pomodoro/:id` – Mark session as completed
- **DELETE** `/api/pomodoro/:id` – Delete session

### Postman Collection:
For detailed testing, use the Postman collection in the `postman/` folder.

- `postman/pomodoro-timer-collection.json`

The collection includes requests for:
- Local testing (`http://localhost:8000`)
- Live testing (`https://app25.onrender.com`)
