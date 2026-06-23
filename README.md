# WeatherGuard Admin

## Overview

WeatherGuard Admin is a secure, invite-only weather alert platform that connects a React-based admin dashboard with a Telegram bot using a NestJS backend.

Users authenticate using Google or GitHub OAuth. After signing in, they can request access to the platform. Access requests are reviewed by an administrator, who can approve or reject users from the admin dashboard. Once approved, users become eligible to receive automated weather alerts through Telegram.

---

# Features

### Authentication

* Google OAuth Login
* GitHub OAuth Login
* JWT-based authentication
* Role-based authorization (Admin/User)

### Approval Workflow

* User submits an access request
* Admin reviews pending requests
* Admin can approve or reject requests
* Approval status stored in MongoDB

### Telegram Integration

* Users connect their Telegram account using their Telegram Chat ID
* Telegram bot sends approval notifications
* Telegram bot sends automated weather alerts

### Weather Alert Scheduler

* Implemented using **node-cron**
* Runs automatically at scheduled intervals
* Sends alerts only to approved users

---

# Tech Stack

## Backend

* NestJS
* Passport.js
* JWT Authentication
* Mongoose
* MongoDB Atlas
* node-cron

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router

## External Services

* Google OAuth
* GitHub OAuth
* Telegram Bot API

---

# System Design

## Database Schema

### Users Collection

```json
{
  "_id": "ObjectId",
  "name": "Ishika Savita",
  "email": "user@example.com",
  "provider": "google",
  "role": "user",
  "isApproved": false,
  "telegramChatId": "1481214933",
  "createdAt": "Date"
}
```

### Access Requests Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "status": "pending",
  "createdAt": "Date"
}
```

Possible status values:

* pending
* approved
* rejected

### Weather Alerts Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "message": "WeatherGuard alert: heavy rain expected in your area.",
  "sentAt": "Date"
}
```

---

# Application Flow

## 1. User Authentication

1. User clicks Login with Google or GitHub.
2. OAuth provider authenticates the user.
3. NestJS generates a JWT token.
4. User is redirected to the React dashboard.

---

## 2. Request Access

1. User opens Dashboard.
2. User clicks **Request Access**.
3. A new record is created in the Access Requests collection.
4. Status is marked as **pending**.

---

## 3. Admin Approval

1. Admin logs in.
2. Admin opens the Admin Dashboard.
3. Pending requests are displayed.
4. Admin chooses:

   * Approve
   * Reject

If approved:

```text
user.isApproved = true
request.status = approved
```

If rejected:

```text
user.isApproved = false
request.status = rejected
```

---

## 4. Telegram Connection

1. User starts the WeatherGuard Telegram Bot.
2. User obtains their Telegram Chat ID.
3. User saves the Chat ID in the dashboard.
4. Chat ID is stored in MongoDB.

---

## 5. Approval Notification

When an admin approves a user:

1. Approval status is updated.
2. Telegram service is triggered.
3. User receives:

```text
Hi <username>, your WeatherGuard access request has been approved.
```

---

## 6. Weather Alert Scheduler

A node-cron job runs automatically.

The scheduler queries MongoDB and selects only users where:

```javascript
isApproved === true
```

For each approved user:

1. Weather alert message is generated.
2. Telegram bot sends the alert.
3. Alert is stored in the Weather Alerts collection.

### Security Rule

Only approved users receive weather alerts.

Unapproved users are completely ignored by the scheduler.

---

# API Endpoints

## Authentication

```http
GET /auth/google
GET /auth/google/callback

GET /auth/github
GET /auth/github/callback
```

## User

```http
PATCH /users/telegram-chat-id
```

## Access Requests

```http
POST /requests/access
GET /requests/status
```

## Admin

```http
GET /admin/pending-users

GET /admin/users

PATCH /admin/approve/:id

PATCH /admin/reject/:id
```

# Setup Instructions

## Clone Repository

```bash
git clone <your-github-repository-url>
cd weatherguard-admin
```

---

## Backend Setup

```bash
cd api
npm install
npm run start:dev
```

Create a `.env` file:

```env
MONGODB_URI=
JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

TELEGRAM_BOT_TOKEN=

ADMIN_EMAILS=

FRONTEND_URL=http://localhost:5173
```

---

## Frontend Setup

```bash
cd admin
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```



## backend Setup

```bash
cd api
npm install
```
Start Development Server
```
npm run start:dev
The API server will run on:
http://localhost:3000
```
---

# Testing Checklist

### User Flow

* Login with Google
* Login with GitHub
* Submit access request
* Save Telegram Chat ID

### Admin Flow

* View pending requests
* Approve user
* Reject user

### Telegram Flow

* Receive approval notification
* Receive scheduled weather alert

### Database Verification

* User records stored
* Access requests stored
* Weather alerts stored

---

# Demo Video Checklist

https://www.loom.com/share/f9caf29f885d41c6b460c41038e7af94?t=89

1. Google or GitHub login
2. Request Access workflow
3. Admin reviewing pending requests
4. Admin approving a user
5. Telegram approval notification
6. Automated weather alert received on Telegram
7. MongoDB collections updating

---

# Future Improvements

* Automatic Telegram Chat ID retrieval
* Real weather API integration
* BullMQ support
* Email notifications
* Dashboard analytics
* Multi-region weather alerts

---

# Author

Ishika Savita

B.Tech Electrical Engineering
Madhav Institute of Technology & Science (MITS), Gwalior

Full Stack Developer (React, Node.js, NestJS, MongoDB)
