# 📦 Parcel Delivery System API

**Developer:** Md. Nazmus Sakib

---

## 🌟 Project Overview

Parcel Delivery System API is a robust and secure backend application designed to handle all operations of a modern courier service. The platform offers a seamless and efficient way for users to register as senders or receivers, create parcel requests, and track their delivery status in real-time. Admins have complete control over user management and delivery status updates, ensuring a streamlined operation.

---

## 🛠️ Technology Stack

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white&style=for-the-badge)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=for-the-badge)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=white&style=for-the-badge)](https://jwt.io/)
[![bcrypt](https://img.shields.io/badge/Bcrypt-00599C?logo=github&logoColor=white&style=for-the-badge)](https://github.com/kelektiv/node.bcrypt.js)
[![Zod](https://img.shields.io/badge/Zod-3E6B8A?logo=zod&logoColor=white&style=for-the-badge)](https://zod.dev/)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **Database Library:** Mongoose
- **Security:** JWT, bcrypt
- **Validation:** Zod

---

## ✨ Core Features

- **Role-Based Access Control:** Advanced role management with dedicated features for Admins, Senders, and Receivers, ensuring personalized functionality for each role.
- **Secure Authentication with Token Management:** Robust authentication system with JSON Web Tokens (JWT) to enhance security and manage user sessions effectively.
- **Comprehensive Parcel Management:** An organized system for creating, viewing, and managing parcels with real-time status updates.
- **Real-Time Status Tracking:** Every parcel's status change is logged and can be tracked by both senders and receivers for complete transparency.
- **Parcel Cancellation Logic:** Senders can cancel parcels only if they have not yet been dispatched, ensuring business rules are followed.
- **User & Admin Dashboards:** Admin dashboard for managing all users and parcels, including blocking users and updating parcel statuses with ease.
- **RESTful API Design:** A clean and intuitive API design that uses standard REST principles for easy integration and use.

---

## 📦 Local Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/engrsakib/LogistiCore-a-percel-booking.git
cd parcel-delivery-system
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create `.env` File

Add your environment variables as required.

#### 4. Start the Server

```bash
npm run dev
```

**The server will run at:** [http://localhost:5000](http://localhost:5000)

---

## 🚀 API Base URL

```
https://logisticoreserver.vercel.app/api/v1
```

---

## 🔐 Authentication Routes

### Register  
`POST /auth/register`
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password@123",
  "role": "Sender"
}
```

### Login  
`POST /auth/login`
```json
{
  "email": "john.doe@example.com",
  "password": "Password@123"
}
```

### Reset Password  
`POST /auth/reset-password`
```json
{
  "oldPassword": "Password@123",
  "newPassword": "NewPassword@123"
}
```

### Logout  
`POST /auth/logout` *(No body required)*

---

## 📦 Parcel Routes

### Create Parcel (Sender)  
`POST /parcels`
```json
{
  "receiver": {
    "name": "Jane Smith",
    "phone": "01911223344",
    "address": "123 Test Street, Dhaka",
    "userId": "60c72b2f9c1d44001c8c8c8c"
  },
  "parcelType": "Electronics",
  "weight": 1.5,
  "deliveryAddress": "123 Test Street, Dhaka"
}
```

### All Parcels (Admin)  
`GET /parcels`

### My Parcels (Sender)  
`GET /parcels/my`

### Incoming Parcels (Receiver)  
`GET /parcels/incoming`

### Cancel Parcel (Sender)  
`PATCH /parcels/:id/cancel`
```json
{
  "status": "Cancelled",
  "location": "Dhaka Hub",
  "note": "Parcel has been approved for delivery."
}
```

### Update Parcel Status (Admin)  
`PATCH /parcels/:id/status`
```json
{
  "status": "Approved",
  "location": "Dhaka Hub",
  "note": "Parcel has been approved for delivery."
}
```

---

## 👤 User Routes

### Register (Public)  
`POST /users/register`
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Password@123",
  "role": "Sender"
}
```

### All Users (Admin)  
`GET /users/all-users`

### Single User (Authenticated)  
`GET /users/:id`

### Update User (Authenticated)  
`PATCH /users/:id`
```json
{
  "name": "Updated Name",
  "email": "user email requerd to update",
  "phone": "01655667788"
}
```

### Change User Status (Admin)  
`PATCH /users/:id/status`
```json
{
  "status": "Blocked"
}
```

### Delete User (Admin)  
`DELETE /users/:id`

---

## 🧪 Testing & Demo

All endpoints have been tested with Postman.  
A demo video showcasing all features is available.

---

## 🔒 Secure, 🚀 Fast, and ⚙️ Modular

This Parcel Delivery API is built for real-world production use.

---

## 👨‍💻 Developer

**Md. Nazmus Sakib**  
🌐 [GitHub](https://github.com/engrsakib)  
💼 [LinkedIn](https://www.linkedin.com/in/engrsakib/)

---