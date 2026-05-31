# VaultX — Password Manager App

VaultX is a full-stack password manager application built with React, Tailwind CSS, Express.js, and MongoDB. It allows users to securely manage their website login details through a clean, responsive, and easy-to-use interface.

The app provides a simple dashboard where users can save, view, edit, delete, and copy their saved credentials.

---

## Features

* Save website credentials
* Add website URL, username, and password
* Edit saved passwords
* Delete saved passwords
* Copy website URL, username, and password
* Show and hide password input
* Responsive user interface
* Modern design using Tailwind CSS
* Backend API using Express.js
* MongoDB database support
* CORS-enabled frontend and backend connection

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* CORS
* Body Parser
* Dotenv

---

## How It Works

VaultX has two main parts:

1. **Frontend:**
   The React frontend provides the user interface where users can add, edit, delete, and copy passwords.

2. **Backend:**
   The Express.js backend handles API requests and stores password data inside a MongoDB database.

---

## API Routes

### Get All Passwords

```http
GET /
```

Fetches all saved passwords from the MongoDB database.

---

### Save a Password

```http
POST /
```

Saves a new password entry in the database.

---

### Delete a Password

```http
DELETE /
```

Deletes a selected password entry from the database.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/eshmalarshad/VaultX.git
```

### 2. Open the Project Folder

```bash
cd VaultX
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is installed and running on your system.

Default MongoDB URL used in the project:

```bash
mongodb://localhost:27017/
```

Database name:

```bash
VaultX
```

Collection name:

```bash
Passwords
```

---

## Run the Frontend

```bash
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

---

## Run the Backend

```bash
node server.js
```

The backend will run on:

```bash
http://localhost:3000
```

---

## Environment Variables

You can create a `.env` file for environment variables if needed.

Example:

```env
MONGO_URI=mongodb://localhost:27017/
PORT=3000
```

---

---

## Future Improvements

* Add user authentication
* Add password encryption
* Add master password protection
* Add search functionality
* Add password strength checker
* Improve database security

---

## About the Project

VaultX is created to practice full-stack development using React and Node.js. It demonstrates how frontend and backend applications communicate with each other using API requests and how data can be stored permanently in MongoDB.

---
