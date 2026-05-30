# User Registration System with JWT Authentication

A backend-based User Registration System built using Node.js, Express.js, MongoDB, and JWT Authentication.

This project allows users to register by entering their details through a registration form. The user data is stored securely in the MongoDB database, and a JWT token is generated after successful registration.

## Features

* User registration form
* Store user details in MongoDB
* Generate JWT token after registration
* Password hashing using bcrypt
* REST API based backend
* Backend validation and error handling

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt.js

## Installation

### 1. Clone the repository

```bash
git clone <repository-link>
```

### 2. Open project folder

```bash
cd jwt-auth-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env` file

Add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 5. Start the server

```bash
npm start
```

## API Endpoint

### Register User

```http
POST /register
```

### Request Body

```json
{
  "username": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN"
}
```

## Future Improvements

* User Login System
* Protected Routes
* Token Verification Middleware
* Password Reset Functionality
* Frontend Authentication Dashboard

## Author
Dipanshu Soni
