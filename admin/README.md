# WeatherGuard Admin Frontend

React, TypeScript, Vite, and Tailwind CSS admin panel for the WeatherGuard backend.

## Features

- Google and GitHub login entry points.
- User dashboard for access requests and Telegram chat ID connection.
- Admin dashboard for reviewing pending requests.
- Approve and reject actions connected to the NestJS API.
- Approved users table for quick review.
- Protected user and admin routes.
- Axios API layer with bearer token support.

## Project Structure

```text
src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── types/
├── routes/
└── utils/
```

## Environment Variables

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

For deployment, set `VITE_API_URL` to the deployed NestJS API URL.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment Notes

This app can be deployed as a static Vite frontend on Render, Vercel, Netlify, or similar platforms.

Set the build command to:

```bash
npm run build
```

Set the publish directory to:

```bash
dist
```

## OAuth Note

The login buttons open the backend OAuth routes:

- `GET /auth/google`
- `GET /auth/github`

The frontend also includes `/auth/callback` support for `?accessToken=...`, `?token=...`, or base64 encoded `?auth=...` callback payloads. If the backend returns raw JSON directly from the OAuth callback during local testing, paste the returned JWT into the login page access token field.
