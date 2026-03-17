# 🏥 Curelex Admin Panel

A full-stack admin dashboard designed to manage doctors, patients, and analytics efficiently. This project demonstrates real-world API integration by connecting a frontend admin interface with a Node.js backend.

---

## 🚀 Features

* 👨‍⚕️ Doctor Management (View, Add, Status)
* 👥 Patient Management
* 📊 Dashboard with live statistics
* ✅ Doctor Verification (Approve / Reject)
* 📈 Advanced Analytics (Charts using Chart.js)
* 🔄 Fully Dynamic Data (No hardcoded data)
* ⚡ API Integration with Node.js backend

---

## 🧠 What I Implemented

* Connected frontend with backend REST APIs
* Replaced static data with dynamic API responses
* Implemented multiple endpoints:

  * `/api/doctors`
  * `/api/patients`
  * `/api/dashboard`
  * `/api/doctors/pending`
  * `/api/doctors/verify`
  * `/api/analytics`
* Handled loading states and error states
* Built reusable UI rendering logic

---



---

## 📂 Project Structure

```
curelex-admin/
│
├── backend/
│   └── server.js
│
├── css/
├── js/
│   ├── dashboard.js
│   ├── doctors.js
│   ├── patients.js
│   ├── doctorVerification.js
│   ├── analytics.js
│
├── *.html
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```
git clone https://github.com/your-username/curelex-admin-panel.git
```

---

### 🔹 2. Run Backend

```
cd backend
npm install
node server.js
```

Server will run at:

```
http://localhost:8080
```

---

### 🔹 3. Run Frontend

* Open project in VS Code
* Use Live Server
* Or open `dashboard.html`

---

## 🔗 API Endpoints

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| GET    | /api/doctors         | Get all doctors |
| POST   | /api/doctors         | Add doctor      |
| GET    | /api/patients        | Get patients    |
| GET    | /api/dashboard       | Dashboard data  |
| GET    | /api/doctors/pending | Pending doctors |
| POST   | /api/doctors/verify  | Approve/Reject  |
| GET    | /api/analytics       | Analytics data  |

---

## 💡 Future Improvements

* 🔐 Authentication (JWT Login)
* 💾 Database Integration (MongoDB)
* 🌐 Deployment (Render / Netlify)
* 📱 Responsive Design

---

## 👨‍💻 Author

**Aryan Ubale**

---

## ⭐ If you like this project, give it a star!
