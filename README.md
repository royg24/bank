# 🏦 GoldBank

A simple **full-stack banking application** with:

- 🔐 Secure authentication  
- 💸 Balance tracking & transaction management  
- 🎥 Real-time **video chat integration**

Built with **Node.js**, **Express**, **MongoDB**, **WebSockets**, and Dockerized for easy deployment. Frontend hosted on **Firebase**, backend on **Render**.

---

### 🔗 Live Demo

-  **Frontend**: [https://goldbank-73f4e.web.app](https://goldbank-73f4e.web.app)  
-  **Backend API**: [https://bank-fmud.onrender.com/api](https://bank-fmud.onrender.com/api)

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies](#-technologies)
- [📖 API Endpoints](#-api-endpoints)
- [🙌 Credits](#-credits)

---

## ✨ Features

-  **User registration** with input validation  
-  **JWT-based login authentication**  
-  **Display balance** and transaction history  
-  **Money transfer** between users  
-  **Real-time transfer updates** across clients  
-  **Real-time video chat** between users  
-  **Dockerized backend + MongoDB**

---

## 🛠️ Technologies

| Layer              | Stack                                      |
|--------------------|---------------------------------------------|
| **Backend**         | Node.js, Express, TypeScript               |
| **Frontend**        | React, TypeScript, Vite                    |
| **Database**        | MongoDB, Redis                             |
| **Real-time**       | Socket.io                                  |
| **Authentication**  | Google OAuth, JWT                          |
| **DevOps**          | Docker, Docker Compose                     |
| **Deployment**      | Firebase (frontend), Render (backend)      |

---

## 📖 API Endpoints

> All routes are prefixed with `/api`

| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| `POST` | `/auth/sign-up`          | Create a new user                 |
| `POST` | `/auth/sign-up/send`     | Send 6-digit verification code    |
| `POST` | `/auth/sign-up/validate` | Validate verification code        |
| `POST` | `/auth/login`            | Log in user                       |
| `POST` | `/logout`                | Log out user                      |
| `GET`  | `/balance`               | Get current user balance 🔒       |
| `GET`  | `/transactions`          | View transaction history 🔒       |
| `POST` | `/transactions`          | Create a new transaction 🔒       |
| `GET`  | `/verify-token`          | Validate access token             |

🔒 = Requires authentication using header:  

---

## 🙌 Credits

- Developed by [**Roy Goldhar**](https://github.com/royg24)

---
