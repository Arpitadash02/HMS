HMS — Hospital Management System
Project Name
Hospital Management System (HMS)

HMS is a web-based demo application for managing patient accounts, doctor departments, appointments, patient admissions, room/ward allocation, and hospital bed availability.
Problem Statement
Hospitals need a clear way to keep track of patient details, appointments, admission status, room assignments, and available beds. When this information is handled in separate places or updated manually, it can be difficult for staff and patients to know the latest status.

This project demonstrates a centralized application that connects these basic workflows in one place. It is an educational demo, not a production clinical system.
Target Users
- Patients: create an account, sign in, book appointments, and view their patient/admission information.
- Doctors: view appointments assigned to them and update admission status and room/ward details.
- Demo evaluators or developers: explore the workflows and use the project as a learning example for a full-stack application.
Solution
HMS provides a React-based interface backed by an Express API and MongoDB database. Users sign in to access role-specific workflows. Patients can book appointments with doctors in supported departments, while doctors can manage appointment-related admission information. The Patients & Beds view presents patient admission details and a bed-availability summary based on the configured hospital capacity.
Key Features
- Patient registration and login.
- Automatic patient record and patient ID creation during patient registration.
- Doctor demo registration and login with department selection.
- Supported departments: Cardiology, Cardiac Surgery, Orthopedics, Neurology, Neurosurgery, Pediatrics, Gynecology, and General Medicine.
- Appointment booking with a doctor, date, and time.
- Doctor view of appointments assigned to their account.
- Doctor-managed admission status and room/ward allocation.
- Patient details and Patients & Beds view, including total, occupied, and available bed counts.
- Token-based authentication and protected API routes.
- Configurable hospital bed capacity.
Tech Stack
Area	Technologies
Frontend	React, Vite, JavaScript, CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JSON Web Tokens (JWT), password hashing
Configuration	Environment variables (.env)
Optional deployment support	Docker, Docker Compose, Render configuration (see DEPLOYMENT.md)


Architecture
The application has three main parts:
1. Frontend (Frontend/) — React pages and components provide registration, login, dashboards, appointments, patient details, and bed-availability views. API requests are sent to the backend using VITE_API_BASE_URL.
2. Backend (Backend/) — Express routes, controllers, and authentication middleware validate requests and implement patient, user, and appointment workflows. The backend uses environment variables for its configuration.
3. Database (MongoDB) — Mongoose models store user, patient, and appointment data. The backend connects to the database using MONGO_URI.
Typical request flow: Browser → React/Vite frontend → Express API → MongoDB. API responses return through the same path to update the interface.
Local Setup
Prerequisites
- Node.js and npm installed.
- A MongoDB Atlas database or a local MongoDB instance.
- Two terminals, one for the backend and one for the frontend.
1. Configure and run the backend
From the project root, open PowerShell:
cd Backend
npm install
Copy-Item .env.example .env
Edit Backend/.env and set the values described in Environment Variables. Ensure the MongoDB database user/password and Atlas network access are configured correctly.

Generate a JWT secret if needed:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Start the backend:
npm run start
The API normally runs at http://localhost:3000. Check its health endpoint at http://localhost:3000/health.
2. Configure and run the frontend
Open a second PowerShell terminal from the project root:
cd Frontend
npm install
Create Frontend/.env with:
VITE_API_BASE_URL=http://localhost:3000
Start Vite:
npm run dev
Open the local URL printed by Vite, normally http://localhost:5173.
3. Try the main workflow
1. Register a patient account and sign in.
2. Register a demo doctor account and select a supported department.
3. Sign in as a patient and book an appointment with a doctor.
4. Sign in using the doctor account that was selected for the appointment.
5. Update the admission status and room/ward, then review the patient and bed information.
Use separate accounts to test the patient and doctor workflows. Keep both backend and frontend terminals running while using the app.
Environment Variables
Create .env files locally; do not commit real secrets or credentials. The exact variable names should match the supplied .env.example files.
Backend (Backend/.env)
Variable	Purpose	Example / guidance
PORT	Port used by the API server	3000 locally; a hosting provider may set this automatically
MONGO_URI	MongoDB connection string	Use your own Atlas/local connection string; URL-encode special characters in credentials
JWT_SECRET	Secret used to sign authentication tokens	Use a long, random value of at least 32 characters
CLIENT_ORIGIN	Allowed frontend origin for browser requests	http://localhost:5173 locally; set to the deployed frontend origin in production
HOSPITAL_TOTAL_BEDS	Total bed capacity used for availability calculations	50 for a demo; adjust to your test data


Frontend (Frontend/.env)
Variable	Purpose	Example
VITE_API_BASE_URL	Base URL of the backend API	http://localhost:3000 locally; use the deployed API URL after deployment


Only public configuration belongs in the frontend environment. Never place MONGO_URI, JWT_SECRET, database passwords, or other private credentials in Frontend/.env. Variables prefixed with VITE_ are exposed to the browser.
Deployment
The repository includes DEPLOYMENT.md, Docker-related files, and a Render configuration to help with deployment. Follow DEPLOYMENT.md for provider-specific steps and production checks.

At deployment time:
1. Deploy the backend and configure PORT (if required by the provider), MONGO_URI, JWT_SECRET, CLIENT_ORIGIN, and HOSPITAL_TOTAL_BEDS in the backend service settings.
2. Deploy the frontend and set VITE_API_BASE_URL to the public backend API URL, then rebuild/redeploy the frontend.
3. Set CLIENT_ORIGIN to the exact public frontend origin, verify the backend /health endpoint, and test registration, login, appointment booking, and admission updates.
Live application URL: Add the public frontend URL here after deployment.
Backend API URL: Add the public API URL here after deployment.

No live URL is listed yet because a deployment URL has not been provided in this README. Do not treat localhost URLs as public deployment links.
Demo Video
A walkthrough video is available as [`HMS_Project_Walkthrough.mp4`](./HMS_Project_Walkthrough.mp4) and is approximately 3–5 minutes long. It explains the problem, target users, and the intended patient and doctor workflows using illustrative screens.

Submission note: this video is an illustrative walkthrough, not a live screen recording of the running application. If your evaluation requires proof of the final working product, record a fresh screen capture while the app is running and demonstrate:
1. Patient registration and login.
2. Doctor registration/login and department selection.
3. Appointment booking as a patient.
4. The assigned doctor viewing the appointment and updating admission status and room/ward.
5. The patient record and bed-availability view.
Focus on the application working rather than reading source code. Keep database credentials, tokens, and other secrets out of view.
Limitations and Safety Notice
This is a learning/demo project. Public doctor registration is enabled to make testing easier. A real hospital deployment would require administrator approval for doctor accounts, stronger authorization and access controls, audit logging, backups, privacy-law compliance, and professional security and clinical validation. Do not use this starter to store real patient information or make clinical decisions without a qualified professional revi