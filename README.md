🚨 Smart Emergency Response System

A real-time AI-powered emergency response platform designed to reduce ambulance response time by intelligently coordinating dispatch, navigation, and traffic control — built for AI-Verse Hackathon.

🧠 Problem Statement
Emergency medical response often suffers from:
Delayed ambulance dispatch
Inefficient routing due to traffic
Poor coordination between control rooms and drivers
Even a few minutes of delay can cost lives.

💡 Our Solution
The Smart Emergency Response System provides a dual-interface platform:

1. Emergency Dispatch Interface
Used by emergency service personnel to:
Trigger SOS cases
Receive patient location via GPS/SMS
Assign ambulances
Compute fastest routes using AI logic
Send traffic alerts to control rooms
Monitor live ambulance movement on a map

2. Ambulance Driver Interface
Used by ambulance drivers to:
View assigned emergency details
Navigate to patient location
Mark patient pickup
Navigate to the nearest hospital
Get real-time ETA updates

> Key Features
Hybrid Location Detection (GPS + SMS)
Ambulance Assignment System
AI-Based Route Optimization
Live Map Navigation (Leaflet + OpenStreetMap)
Traffic Alert System
Dynamic Re-routing on Traffic Jam
Separate Interfaces for Dispatch & Driver
Real-time State Sync using Flask APIs

🛠️ Tech Stack
Layer ----	Technology
Frontend ----	HTML, CSS, JavaScript
Mapping ----	Leaflet.js, OpenStreetMap
Backend ----	Python, Flask
Data ----	JSON
Version Control ----	Git,GitHub

📁 Project Structure
AI-Verse-Hackathon/
│
├── app.py
├── requirements.txt
├── data/
│   └── ambulances.json
│
├── templates/
│   ├── index.html
│   ├── driver.html
│   └── traffic.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   ├── driver.css
│   └── driver.js
│
└── .gitignore

🚀 How to Run the Project
1️ Clone the Repository
git clone https://github.com/<your-username>/AI-Verse-Hackathon.git
cd AI-Verse-Hackathon

2️ Create Virtual Environment
python -m venv venv
venv\Scripts\activate

3️ Install Dependencies
pip install -r requirements.txt

4️ Run the Application
python app.py

5️ Open in Browser
Dispatch Interface: http://127.0.0.1:5000/

Ambulance Driver Interface: http://127.0.0.1:5000/driver

Traffic Control View: http://127.0.0.1:5000/traffic

🔁 Workflow Overview
Dispatcher triggers SOS
Patient location received (GPS/SMS)
Ambulance is assigned
AI computes fastest route to patient
Driver navigates to patient
Patient pickup confirmed
AI computes fastest route to hospital
Traffic alerts sent if congestion detected

🌟 What Makes This Unique?
Not just Map navigation
AI-inspired routing logic
Emergency-first traffic handling
Clear role separation (Dispatcher vs Driver)
Hackathon-ready, extensible architecture

📌 Future Enhancements
Real-time traffic API integration
Voice-guided navigation
Hospital bed availability integration
Multiple ambulance coordination
ML-based traffic prediction

👩‍💻 Team
Bhashyani Malla, Shanmukee Medha
(Team: CodeX2)

🏁 Conclusion:
This project demonstrates how AI + Maps + Smart Coordination can drastically improve emergency response times and save lives.
“In emergencies, speed is not a feature — it’s survival.”
