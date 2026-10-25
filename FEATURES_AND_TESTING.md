# Feature walkthrough / smoke test

## First-time setup
1. Configure `Backend/.env` using `Backend/.env.example`; use a working MongoDB URI and a JWT secret of at least 32 characters.
2. Set `HOSPITAL_TOTAL_BEDS` to the bed capacity for this demo.
3. In one terminal run `cd Backend`, `npm install`, `npm run start`.
4. In another terminal run `cd Frontend`, `npm install`, `npm run dev`.
5. Open the Vite URL, normally `http://localhost:5173`.

## Test registration and login
1. Register a new patient account with an age, email, and password (8+ characters).
2. Log in using that account. A linked patient record and HMS patient ID are created automatically.
3. Log out, then register a doctor account and choose a department.
4. Log in as the doctor.

## Test appointment and admission
1. As the patient, open Appointments and select a doctor, date, and time.
2. Log in as that doctor. The appointment should appear in the doctor's list.
3. Set Admission status to `Admitted`, enter a room/ward such as `W-204`, and click Save admission.
4. Log back in as the patient and open Patients & Beds. The room and admission status should be visible.
5. The available-bed count decreases when a patient is admitted and increases when changed to Not admitted.

## Departments
Cardiology, Cardiac Surgery, Orthopedics, Neurology, Neurosurgery, Pediatrics, Gynecology, General Medicine.

## Existing test accounts
Patient accounts created before this update may not have a linked Patient document, and older doctor records may not have a department. Use fresh test accounts for the new flow, or manually migrate the old records in MongoDB.

## Limitations
This is a demo app. Doctor self-registration is enabled for ease of testing. Do not use it with real patient data without admin approval workflows, security review, access logging, and privacy safeguards.
