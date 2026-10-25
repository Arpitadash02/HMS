# HMS — Hospital Management System

**Project name:** Hospital Management System (HMS)

HMS is an educational full-stack demo for patient accounts, a hospital department and doctor directory, appointment scheduling, admissions, room/ward allocation, and bed availability. It is not a production clinical system.

## Problem statement
Patients and staff need a clear place to discover specialties, schedule appointments, and understand admission and bed status. HMS brings these demo workflows into one web application.

## Target users
- **Patients:** register, log in, book appointments, and view their patient/admission information.
- **Doctors:** see appointments assigned to their account and update appointment and admission information.
- **Developers/evaluators:** explore a MERN full-stack application and its deployment configuration.

## Solution and features
- Patient registration/login; patient ID generated automatically.
- Nine departments: Cardiology, Cardiac Surgery, Orthopedics, Neurology, Neurosurgery, Pediatrics, Gynecology, General Medicine, and Dermatology.
- Demo directory with two illustrative doctors per department and example consultation fees in INR.
- Seed script to create 18 demo doctor accounts for local testing.
- Appointment booking by doctor, date, and available demo time slot; appointment list and status updates.
- Doctor-managed admission status and room/ward assignment.
- Patients & Beds view showing total, occupied, and available beds based on admitted patient records.
- JWT authentication, password hashing, protected API routes, environment-based configuration, Docker files and Render configuration.

> The names, fees, working hours, and slots are fictional demonstration data, not real hospital availability or medical pricing. The dashboard directory is illustrative; seed the demo doctors into MongoDB so their accounts are selectable in appointment booking. Do not use this project to store real patient health information.

## Tech stack
| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS/Tailwind utility classes |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, bcryptjs password hashing |
| Configuration/deployment | `.env`, Docker, Docker Compose, Render configuration |

## Architecture
1. `Frontend/` contains the React/Vite UI and sends requests using `VITE_API_BASE_URL`.
2. `Backend/` contains Express routes, controllers, authentication middleware, Mongoose models, and the `/health` endpoint.
3. MongoDB stores users, patient profiles, and appointments.

Request path: Browser → React/Vite → Express API → MongoDB → API response → UI.

## Local setup
### Prerequisites
- Node.js (LTS) and npm
- MongoDB Atlas database or local MongoDB
- Two terminal windows

### 1. Configure backend
From the repository root in PowerShell:

```powershell
cd Backend
npm install
Copy-Item .env.example .env
```

Edit `Backend/.env` and set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN`. Generate a JWT secret with:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the API:

```powershell
npm run start
```

API: `http://localhost:3000`; health check: `http://localhost:3000/health`.

### 2. Seed demo doctors (recommended)
With backend environment variables configured, open a separate terminal:

```powershell
cd Backend
npm run seed:doctors
```

The script creates two doctor accounts for each of the nine departments, preserving any existing accounts. Seeded local demo doctors use password `DemoDoctor123!`. Their emails end in `@hms-demo.local`. This is demo-only: never use this shared password on a public or production deployment. For a public demo, change the script/password and restrict doctor account creation to approved staff.

### 3. Configure and start frontend
Open a second terminal from the project root:

```powershell
cd Frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Ensure `Frontend/.env` contains:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

Open the local URL Vite prints, normally `http://localhost:5173`.

### 4. Try the workflow
1. Register a patient account and log in.
2. Browse departments, doctor names, and example consultation charges on the dashboard.
3. Book a doctor/date/time slot on Appointments.
4. Log in as the doctor assigned to the appointment to review it and update admission status/room.
5. Open Patients & Beds to view the patient's status and bed summary.

## Environment variables
### Backend (`Backend/.env`)
| Variable | Purpose | Example |
|---|---|---|
| `PORT` | API port | `3000` |
| `MONGO_URI` | MongoDB connection string | Your Atlas/local URI; URL-encode special characters in credentials |
| `JWT_SECRET` | JWT signing secret (at least 32 characters) | Random secret generated locally |
| `CLIENT_ORIGIN` | Allowed frontend origin(s), comma-separated | `http://localhost:5173` |
| `HOSPITAL_TOTAL_BEDS` | Configured bed capacity | `50` |

### Frontend (`Frontend/.env`)
| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Public backend API base URL | `http://localhost:3000` |

Never put `MONGO_URI`, database credentials, or `JWT_SECRET` in the frontend environment; `VITE_` values are exposed to browsers. Do not commit `.env` files.

## Deployment
See [`DEPLOYMENT.md`](DEPLOYMENT.md) for Docker/Render guidance. In brief:
1. Deploy the backend and configure `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, and `HOSPITAL_TOTAL_BEDS` in service environment settings.
2. Deploy the frontend with `VITE_API_BASE_URL` set to the deployed backend URL, then rebuild/redeploy.
3. Set `CLIENT_ORIGIN` to the exact frontend origin and verify `/health`, registration, login, appointment booking, admission updates, and bed counts.
4. Do not deploy the demo shared doctor password or use real patient data.

## Demo video
A walkthrough script/video is included in the project archive. For a 3–5 minute demonstration, show registration/login, the department directory, booking, doctor appointment management, admission update, and bed availability.

## Disclaimer
This is a learning/demo project. It has not been designed or audited for production clinical use, real medical decisions, privacy compliance, or real-time hospital scheduling.
