import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../cssfiles/MappingManager.css"

function MappingManager() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const navigate =useNavigate();

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/patients/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setPatients(data);
  };

  const fetchDoctors = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/doctors/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setDoctors(data);
  };

  const mapDoctor = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/mappings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        patient: selectedPatient,
        doctor: selectedDoctor,
      }),
    });

    if (res.ok) {
      alert('Mapping created successfully!');
    } else {
      alert('Mapping failed!');
    }
  };

  const handleClick= async()=>{
    await mapDoctor();
    navigate('/patients');
  };

  return (
    <div className='mapping-manager-container'>
      <h3>Map Patient to Doctor</h3>
      <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
      <button onClick={handleClick} disabled={!selectedPatient || !selectedDoctor}>Map</button>
    </div>
  );
}

export default MappingManager;
