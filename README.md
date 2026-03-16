# Intern Workflow Management System

A full stack MERN application designed to manage and track intern records through their lifecycle. The system provides a centralized interface to create, manage, update, and evaluate intern data while supporting search, filtering, and pagination for efficient data handling.

This project demonstrates a production-style CRUD architecture using MongoDB, Express, React, and Node.js.

---

# Project Outcome

The application enables organizations to manage intern information through a structured workflow.

Key outcomes include:

• Centralized storage of intern records in a MongoDB database  
• RESTful API for managing intern data  
• Responsive frontend dashboard for interacting with intern records  
• Full CRUD functionality including create, update, delete, and retrieve operations  
• Efficient data navigation using search, filters, and pagination  
• Input validation and error handling to ensure data integrity  

The system simplifies intern data management and provides a scalable structure for tracking recruitment and evaluation processes.

---

# System Architecture

The project follows a standard MERN architecture.

Client Layer  
React based frontend providing the user interface.

Application Layer  
Node.js and Express server exposing RESTful APIs.

Data Layer  
MongoDB database accessed through Mongoose models.

```
React (Frontend)
       │
       │ API Requests
       ▼
Node.js + Express (Backend API)
       │
       │ Mongoose ORM
       ▼
MongoDB Database
```

---

# Data Model

## Intern Collection

| Field | Type | Description |
|------|------|-------------|
| name | String | Intern full name |
| email | String | Unique email address |
| role | String | Intern role (Frontend, Backend, Fullstack) |
| status | String | Application status |
| score | Number | Evaluation score (0–100) |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Record update timestamp |

---

# Backend Features

REST API built using **Node.js and Express**

### Endpoints

POST /api/interns  
Create a new intern record

GET /api/interns  
Retrieve all interns with pagination, search, and filters

GET /api/interns/:id  
Retrieve a single intern

PUT /api/interns/:id  
Update an existing intern

DELETE /api/interns/:id  
Delete an intern record

### Additional backend capabilities

• Request validation using Mongoose schema rules  
• Proper HTTP status codes and error responses  
• Pagination for large datasets  
• Search and filter support  

---

# Frontend Features

React based user interface with the following capabilities.

## Intern Dashboard

• Display intern list in a structured table  
• Search interns by name or email  
• Filter interns by role and status  
• Pagination for large datasets  

## Intern Management

• Add new intern via form  
• Edit existing intern information  
• Delete intern with confirmation dialog  

## User Experience

• Form validation  
• Loading indicators during API calls  
• Error handling and display messages  

---

# Technology Stack

## Frontend
React  
Axios  
CSS / Basic UI components  

## Backend
Node.js  
Express.js  
MongoDB  
Mongoose  

## Development Tools
Git  
GitHub  
Postman (API testing)  

---

# Installation Guide

Clone the repository

```bash
git clone https://github.com/yourusername/intern-lifecycle-management-system.git
```

Navigate to project directory

```bash
cd intern-lifecycle-management-system
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

# Environment Configuration

Create a `.env` file in the backend folder

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

# Running the Application

Start backend server

```bash
cd backend
npm run dev
```

Start frontend

```bash
cd frontend
npm start
```

Frontend will run on

```
http://localhost:3000
```

Backend API will run on

```
http://localhost:5000
```

---

# Project Structure

```
intern-lifecycle-management-system

backend
 ├── models
 ├── routes
 ├── controllers
 ├── config
 └── server.js

frontend
 ├── components
 ├── pages
 ├── services
 └── App.js
```

---

# Screenshots / Demo

Demo link (video and screenshots): https://drive.google.com/drive/folders/1LGP_b4WAawLJJk7ANmqnsQb8yaerr3Zi?usp=sharing

Example

• Dashboard View  
• Add Intern Form  
• Edit Intern Record  

---

# Future Improvements

• Authentication and role based access  
• Advanced analytics dashboard  
• Export intern reports  
• Integration with recruitment platforms  

---


# Logical Explanation:
Virtual IDs: Implemented Mongoose virtuals to provide a clean id field to the frontend while maintaining _id in MongoDB Atlas.
Search Logic: Leveraged MongoDB $regex with the i option for case-insensitive partial name/email matching.
CORS & Deployment: Configured dynamic CORS and environment variables to allow secure communication between Render (Backend) and Frontend too.

---

# Author

Developed as part of a MERN stack engineering assignment demonstrating full stack CRUD system design and implementation.
