# HMS — deployment guide

This project uses React + Vite for the frontend, Express/Node.js for the API, and MongoDB/Mongoose for persistence.

## Before you deploy

1. Push this project to a GitHub repository.
2. Create a MongoDB Atlas cluster and database user. Allow network access from your hosting provider as required by Atlas, use a strong database password, and URL-encode special characters in the URI.
3. Keep secrets out of Git. The committed `.env.example` files are templates only.

## Deploy on Render (recommended simple path)

The root `render.yaml` defines one Node API service and one static frontend.

1. In Render, choose **New → Blueprint** and connect the GitHub repository containing `render.yaml`.
2. For the `hms-api` service, set `MONGO_URI` to the MongoDB Atlas connection string.
3. Deploy the API. Test `https://YOUR-API.onrender.com/health` and expect `{"status":"ok"}`.
4. Set `CLIENT_ORIGIN` on the API to the exact static frontend origin, e.g. `https://hms-frontend.onrender.com` (no trailing slash). Save and redeploy the API.
5. For the `hms-frontend` static site, set `VITE_API_BASE_URL` to the API origin, e.g. `https://hms-api.onrender.com` (no `/api` suffix and no trailing slash). Trigger a frontend redeploy after setting it.
6. Test registration, login, adding a patient, and booking an appointment.

`JWT_SECRET` is configured for generated value in the Render Blueprint. If Render does not generate it for your service, set a long random value manually (at least 32 characters).

## Environment variables

### Backend (Render service or `Backend/.env` locally)

- `PORT`: hosting providers supply this automatically; locally defaults to 3000.
- `NODE_ENV`: use `production` in production.
- `MONGO_URI`: required MongoDB connection string, e.g. `mongodb+srv://.../hms?retryWrites=true&w=majority`.
- `JWT_SECRET`: required random secret, at least 32 characters.
- `CLIENT_ORIGIN`: exact frontend origin. Multiple comma-separated origins are supported.

For local development, copy `Backend/.env.example` to `Backend/.env` and adjust values. A local MongoDB server must be running if you use the example URI.

### Frontend

- `VITE_API_BASE_URL`: backend origin only, e.g. `https://hms-api.onrender.com`. Vite variables are embedded in browser code, so never put secrets here.

## Run locally

### Option A: Node + MongoDB

1. Copy `Backend/.env.example` to `Backend/.env`.
2. Ensure MongoDB is running locally or set `MONGO_URI` to your Atlas URI.
3. In one terminal: `cd Backend && npm ci && npm start`
4. In another terminal: `cd Frontend && npm ci && npm run dev`
5. Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

### Option B: Docker Compose

1. Copy root `.env.example` to root `.env` and set a random `JWT_SECRET`.
2. Run `docker compose up --build`.
3. Open `http://localhost:8080`. The API is available at `http://localhost:3000`.

## Important security and functionality notes

- Patient and appointment API endpoints require a valid login token. Login stores the token in local storage and the Axios client sends it as a Bearer token.
- Register a doctor account to make it available in the appointment form. Public self-registration supports only patient and doctor roles; admin cannot be created through public registration.
- This is a starter application, not a certified production clinical system. Before using real patient data, add role-based authorization, audit logging, rate limiting, backups, monitoring, privacy/security review, and appropriate legal/compliance controls.
- The API uses a 1-hour JWT. Log in again after it expires.
- If an older deployment was committed with a real `.env`, rotate those credentials even if the file has since been removed.


## Optional: GitHub Actions + Docker Hub image publishing

The existing workflow publishes Docker images when code is pushed to `main`. Add these repository Actions secrets:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD` (prefer a Docker Hub access token)
- `VITE_API_BASE_URL` (the deployed backend origin, without `/api` or a trailing slash)

The workflow builds the frontend image with `VITE_API_BASE_URL` as a build argument. Rebuild the image whenever this URL changes.
