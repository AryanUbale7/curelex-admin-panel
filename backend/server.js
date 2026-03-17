const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

/* ================== DATA ================== */

let doctors = [
  {
    id: 1,
    name: "Dr. Sharma",
    specialization: "Cardiologist",
    status: "active",
    license: "LIC123",
    date: "2026-03-17"
  },
  {
    id: 2,
    name: "Dr. Mehta",
    specialization: "Dermatologist",
    status: "pending",
    license: "LIC456",
    date: "2026-03-16"
  }
];

let patients = [
  {
    id: 1,
    name: "Rahul",
    age: 25,
    lastVisit: "2026-03-15",
    status: "active"
  },
  {
    id: 2,
    name: "Amit",
    age: 30,
    lastVisit: "2026-03-16",
    status: "inactive"
  }
];

/* ================== DOCTORS ================== */

// Get all doctors
app.get("/api/doctors", (req, res) => {
  res.json(doctors);
});

// Add doctor
app.post("/api/doctors", (req, res) => {
  const newDoctor = {
    id: Date.now(),
    name: req.body.name,
    specialization: req.body.specialization,
    status: req.body.status || "pending",
    license: req.body.license || "LIC" + Date.now(),
    date: new Date().toISOString().split("T")[0]
  };

  doctors.push(newDoctor);
  res.json(newDoctor);
});

/* ================== PATIENTS ================== */

app.get("/api/patients", (req, res) => {
  res.json(patients);
});

/* ================== DASHBOARD ================== */

app.get("/api/dashboard", (req, res) => {
  res.json({
    stats: {
      totalDoctors: doctors.length,
      totalPatients: patients.length,
      dailyPatients: 12
    },
    doctors: doctors,
    chart: {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      patients: [10, 20, 30, 40],
      newPatients: [5, 10, 15, 20]
    }
  });
});

/* ================== DOCTOR VERIFICATION ================== */

// Get pending doctors
app.get("/api/doctors/pending", (req, res) => {
  const pendingDoctors = doctors.filter(d => d.status === "pending");
  res.json(pendingDoctors);
});

// Approve / Reject doctor
app.post("/api/doctors/verify", (req, res) => {
  const { id, status } = req.body;

  doctors = doctors.map(d =>
    d.id === id ? { ...d, status } : d
  );

  res.json({ message: "Doctor updated successfully" });
});

/* ================== ANALYTICS ================== */

app.get("/api/analytics", (req, res) => {
  res.json({
    growth: {
      labels: ["Jan", "Feb", "Mar"],
      values: [10, 20, 30]
    },
    daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      values: [5, 10, 15, 20, 25]
    },
    age: {
      labels: ["0-17", "18-34", "35-54", "55+"],
      values: [8, 20, 15, 10]
    },
    gender: {
      labels: ["Male", "Female"],
      values: [60, 40]
    },
    retention: {
      labels: ["Week1", "Week2", "Week3"],
      newPatients: [10, 20, 30],
      returningPatients: [5, 15, 25]
    }
  });
});

/* ================== SERVER ================== */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});