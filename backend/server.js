const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let doctors = [
  { name: "Dr. Strange", specialization: "Magic" },
  { name: "Dr. Who", specialization: "Time Travel" },
  {name: "Dr.Prabit", specialization: "Cardiology"}
];

// GET doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.use(cors({
  origin: 'http://localhost:3000'
}));


// POST doctor
app.post('/api/doctors', (req, res) => {
  const doctor = req.body;
  doctors.push(doctor);
  res.status(201).json(doctor);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
