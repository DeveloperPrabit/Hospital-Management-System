import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Main = () => {
  const [activeTab, setActiveTab] = useState('Home');

  // Doctors State
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '' });

  // Patients State
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', room: '' });

  // Appointments State
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ patient: '', doctor: '', time: '' });

  // Load from LocalStorage on first load
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    setDoctors(storedDoctors);
    setPatients(storedPatients);
    setAppointments(storedAppointments);
  }, []);

  // Save to LocalStorage when data changes
  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Handlers
  const handleAddDoctor = (e) => {
    e.preventDefault();
    setDoctors([...doctors, newDoctor]);
    setNewDoctor({ name: '', specialization: '' });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    setPatients([...patients, newPatient]);
    setNewPatient({ name: '', room: '' });
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ patient: '', doctor: '', time: '' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <h2>Welcome to Hospital Dashboard</h2>;

      case 'Doctors':
        return (
          <div>
            <h2>Doctors</h2>

            <form onSubmit={handleAddDoctor} style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Doctor's Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                required
              />
              <button type="submit">Add Doctor</button>
            </form>

            <ul>
              {doctors.map((doc, index) => (
                <li key={index}>
                  {doc.name} - {doc.specialization}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'Patients':
        return (
          <div>
            <h2>Patients</h2>

            <form onSubmit={handleAddPatient} style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Patient's Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Room Number"
                value={newPatient.room}
                onChange={(e) => setNewPatient({ ...newPatient, room: e.target.value })}
                required
              />
              <button type="submit">Add Patient</button>
            </form>

            <ul>
              {patients.map((pat, index) => (
                <li key={index}>
                  {pat.name} - Room {pat.room}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'Appointments':
        return (
          <div>
            <h2>Appointments</h2>

            <form onSubmit={handleAddAppointment} style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Patient's Name"
                value={newAppointment.patient}
                onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Doctor's Name"
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                required
              />
              <input
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                required
              />
              <button type="submit">Schedule</button>
            </form>

            <ul>
              {appointments.map((app, index) => (
                <li key={index}>
                  {app.time} - {app.patient} with Dr. {app.doctor}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'Reports':
        return (
          <div>
            <h2>Reports</h2>
            <p>No new reports.</p>
          </div>
        );

      default:
        return <h2>Select a section</h2>;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Hospital</h2>
        <nav>
          <ul>
            {['Home', 'Doctors', 'Patients', 'Appointments', 'Reports'].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ fontWeight: activeTab === tab ? 'bold' : 'normal', cursor: 'pointer' }}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>{activeTab}</h1>
          <div className="user-info">🔔 👤</div>
        </header>

        <section className="content">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default Main;
