# 🚀 Personal Expense Analytics

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows users to manage, track, and analyze their personal income and expenses efficiently.

---

## 📌 Overview

Personal Expense Analytics is a web application where users can:

- 🔐 Register and Login securely
- ➕ Add income and expense transactions
- 📊 View transactions in structured table format
- 🗂 Categorize expenses
- 📅 Track transactions by date
- 💾 Store data securely in MongoDB Atlas
- 🔒 Access protected dashboard after authentication

This project demonstrates complete **frontend-backend integration** using REST APIs.

---

## 🛠 Tech Stack

### 🔹 Frontend
- React (Vite)
- Ant Design (UI Components)
- Bootstrap
- Axios
- React Router DOM

### 🔹 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcrypt (Password hashing)
- JWT (Authentication - if implemented)
- CORS
- Morgan
- dotenv

---

## 🏗 Project Architecture

The application follows a structured MERN architecture with clear separation of concerns.

### 🔹 1. High-Level Flow

Client (React Frontend)
        ↓ HTTP Requests (Axios)
Express Server (Node.js Backend)
        ↓
Routes → Controllers → Models
        ↓
MongoDB Atlas Database

---

### 🔹 2. Frontend Layer

- Built using React (Vite)
- Uses Ant Design for UI components
- Axios handles API communication
- React Router manages routing
- Protected routes restrict unauthorized access

---

### 🔹 3. Backend Layer

The backend follows a layered architecture:

• Routes Layer  
Handles API endpoints and forwards requests to controllers.

• Controller Layer  
Contains business logic for authentication and transactions.

• Model Layer  
Defines MongoDB schemas using Mongoose.

• Middleware Layer  
Handles CORS, logging (Morgan), JSON parsing, and authentication.

---

### 🔹 4. Authentication Flow

1. User registers → password is hashed using bcrypt.
2. User logs in → credentials are validated.
3. User data stored in localStorage (or JWT if implemented).
4. Protected routes check authentication before rendering dashboard.

---

### 🔹 5. Database Design

User Collection:
- name
- email
- password (hashed)

Transaction Collection:
- userid (reference to User)
- amount
- type (income/expense)
- category
- date
- reference
- description

Each transaction is linked to a specific user using userid.

---

### 🔹 6. Request Lifecycle Example (Add Transaction)

1. User submits form (React)
2. Axios sends POST request
3. Express route receives request
4. Controller processes data
5. Mongoose saves data to MongoDB
6. Response sent back to frontend
7. UI updates automatically
