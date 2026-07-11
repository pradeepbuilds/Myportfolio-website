# Pradeep's Portfolio — Full Stack (React + Express + MongoDB)

A premium, terminal-inspired personal portfolio. Black/white base with a
signal-amber accent, monospace details, and a typed hero — built to feel like
a developer's own tool, not a template.

## Structure

```
portfolio/
├── backend/     Express API + MongoDB (Mongoose) + Resend for contact emails
└── frontend/    React (Vite) + Tailwind CSS + Framer Motion
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
- `MONGO_URI` — get a free cluster at https://www.mongodb.com/cloud/atlas
- `RESEND_API_KEY` — sign up at https://resend.com, create an API key
- `CONTACT_TO_EMAIL` — where you want contact form emails delivered
- `CONTACT_FROM_EMAIL` — use `onboarding@resend.dev` until you verify your own domain on Resend
- `CLIENT_URL` — your frontend URL (for CORS)

Seed sample projects, then edit them directly in MongoDB Atlas (or via the API):
```bash
node seed.js
```

Run locally:
```bash
npm run dev
```
API runs at `http://localhost:5000`.

### API routes
| Method | Route              | Purpose                     |
|--------|---------------------|------------------------------|
| GET    | /api/projects        | List all projects            |
| POST   | /api/projects         | Create a project             |
| PUT    | /api/projects/:id     | Update a project             |
| DELETE | /api/projects/:id     | Delete a project             |
| POST   | /api/contact          | Submit contact form (saves to DB + emails via Resend) |

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```
Set `VITE_API_URL` to your backend URL.

Edit `src/data/profile.js` with your real name, email, socials, about text,
and skills — this file drives all personal content on the site.

Run locally:
```bash
npm run dev
```
Site runs at `http://localhost:5173`.

## 3. Deploy

**Backend → Render**
1. Push this repo to GitHub.
2. On Render: New → Web Service → connect repo → set root directory to `backend`.
3. Build command: `npm install` · Start command: `npm start`.
4. Add the same environment variables from `.env` in Render's dashboard.
5. Once deployed, copy the Render URL (e.g. `https://your-api.onrender.com`).

**Frontend → Vercel**
1. On Vercel: New Project → import the same repo → set root directory to `frontend`.
2. Framework preset: Vite.
3. Add environment variable `VITE_API_URL` = your Render backend URL.
4. Deploy.

**Final step:** back in Render, update `CLIENT_URL` to your live Vercel URL so
CORS allows requests from production.

## 4. Customize

- Colors/fonts: `frontend/tailwind.config.js`
- Personal content: `frontend/src/data/profile.js`
- Projects: edit via MongoDB directly, or `POST`/`PUT` requests to `/api/projects`
- Sections/layout: `frontend/src/components/`

## Tech stack

React 18 · Vite · Tailwind CSS · Framer Motion · Node.js · Express · MongoDB
(Mongoose) · Resend
