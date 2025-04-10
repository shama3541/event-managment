# 📅 Event Management App

A simple and dynamic event management system built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. It supports user registration, login, role-based access, event creation and registration, and email notifications.

---

## 🚀 Features

- ✅ User registration and login
- 🔐 JWT-based authentication
- 🧑‍💼 Organizer role: create, update, delete, view events
- 🙋 Attendee role: register for events, view their registrations
- 📬 Email confirmation via Gmail using Nodemailer
- 🔬 Integration tests using Tap and Supertest

---

## 🛠️ Tech Stack

- **Node.js** with Express.js
- **MongoDB** using Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for sending registration emails
- **Tap** + **Supertest** for testing

---

## 🧾 API Endpoints

| Method | Endpoint                  | Role       | Description                       |
|--------|---------------------------|------------|-----------------------------------|
| POST   | `/register`               | Public     | Register a user                   |
| POST   | `/login`                  | Public     | Login and receive JWT             |
| POST   | `/createEvent`           | Organizer  | Create an event                   |
| PUT    | `/updateEvent`           | Organizer  | Update an event                   |
| DELETE | `/deleteEvent`           | Organizer  | Delete an event                   |
| GET    | `/getEvent`              | Organizer  | View all events                   |
| POST   | `/registerForEvent/:id`  | Attendee   | Register for an event             |
| GET    | `/eventsRegistered`      | Attendee   | View registered events            |

---

## 📁 Folder Structure

. ├── app.js ├── Routes/ │ └── Routes.js ├── Controller/ │ ├── User.js │ └── Event.js ├── Middleware/ │ └── Middleware.js ├── Models/ │ ├── UserSchema.js │ └── EventSchema.js ├── utils/ │ └── Email.js ├── tests/ │ └── server.test.js

yaml
Copy
Edit

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/eventapp
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
🔐 Use a Gmail App Password if you have 2FA enabled. You can generate one here.

🚀 Running the App
bash
Copy
Edit
npm install
npm start
🧪 Running Tests
bash
Copy
Edit
npm test
Uses Tap and Supertest to run integration tests under tests/server.test.js. The tests dynamically:

Register users

Login users

Create events

Register for events

Verify user-specific event data

📬 Email Setup
Email confirmation is sent when an attendee registers for an event using Nodemailer with Gmail SMTP.

Make sure:

EMAIL_USER is a Gmail address

EMAIL_PASSWORD is an App Password

🙌 Contributions
Feel free to fork, open issues, or submit pull requests.

✨ Author
Made with 💻 by Shamadeep

yaml
Copy
Edit

---

Let me know if you want:
- Swagger API docs
- Docker support
- Instructions for MongoDB Atlas
- CI workflow for testing automatically on push (e.g., GitHub Actions)