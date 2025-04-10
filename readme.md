# 📅 Event Management App

A simple event management application built with Node.js, Express, MongoDB, and JWT authentication. Users can register, log in, create events (if they are organizers), register for events, and receive email notifications via Gmail using Nodemailer.

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Nodemailer** for email notifications

---

## 🚀 Features

- User registration and login
- Role-based access: Organizer and Attendee
- Organizers can:
  - Create, update, delete, and view events
- Attendees can:
  - Register for events
  - View events they are registered to
- Email confirmation upon event registration

---

## 📁 Project Structure

. ├── Controller/ │ ├── Event.js │ └── User.js ├── Middleware/ │ └── Middleware.js ├── Models/ │ ├── EventSchema.js │ └── UserSchema.js ├── utils/ │ └── mailer.js ├── routes/ │ └── router.js ├── .env ├── server.js └── README.md

yaml
Copy
Edit

---

## 📦 Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/event-management-app.git
cd event-management-app
2. Install dependencies
bash
Copy
Edit
npm install
3. Create .env file
bash
Copy
Edit
touch .env
Add the following content:

env
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
💡 Tip: To generate an app password for Gmail, follow this guide.

4. Start the server
bash
Copy
Edit
npm start
🔌 API Endpoints
Auth
POST /register - Register a user

POST /login - Log in and receive JWT

Events (Organizer only)
POST /createEvent - Create an event

PUT /updateEvent - Update an event

DELETE /deleteEvent - Delete an event

GET /getEvent - Get all events

Event Registration (Attendee only)
POST /registerForEvent/:id - Register for an event

GET /eventsRegistered - Get registered events

✅ Example .env
env
Copy
Edit
PORT=3000
MONGO_URI=mongodb://localhost:27017/eventdb
JWT_SECRET=mytopsecret

EMAIL_USER=yourname@gmail.com
EMAIL_PASSWORD=yourapppassword
📬 Email Configuration
Uses Nodemailer with Gmail SMTP. Make sure:

2FA is enabled for your Gmail

App password is used in .env

📄 License
This project is licensed under the MIT License.

🙌 Contributing
Feel free to fork, raise issues, and submit PRs. Suggestions are welcome!

yaml
Copy
Edit

---

Let me know if you also want:
- A sample Postman collection
- Swagger API docs
- Docker setup instructions
- Hosting setup (Render, Vercel, etc.)