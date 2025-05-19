import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import DoctorForm from './DoctorForm';
import '../cssfiles/DoctorList.css';

const DoctorList = () => {
  const { token } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/doctors/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error(err));
  }, [token]);

  const handleUpdate = (formData) => {
    fetch(`http://localhost:8000/api/doctors/${editingDoctor.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Update failed');
      })
      .then(updatedDoctor => {
        setDoctors(doctors.map(p => (p.id === updatedDoctor.id ? updatedDoctor : p)));
        setEditingDoctor(null);
      })
      .catch(err => alert(err.message));
  };

  const handleDeletion = (doctor) => {
    fetch(`http://localhost:8000/api/doctors/${doctor.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          alert('Doctor deleted successfully!');
          setDoctors(prev => prev.filter(doc => doc.id !== doctor.id));
          if (editingDoctor?.id === doctor.id) {
            setEditingDoctor(null);
          }
        } else {
          throw new Error('Deletion failed');
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="doctor-list-container">
      <h2>Doctors</h2>
      <button className="create-btn" onClick={() => window.location.href = "/doctor-form"}>
        Create Doctor
      </button>
      <ol>
        {doctors.map(doc => (
          <li key={doc.id}>
            <span>{doc.name} - {doc.specialization}</span>
            <div>
              <button onClick={() => setEditingDoctor(doc)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeletion(doc)}>Delete</button>
            </div>
          </li>
        ))}
      </ol>
      {editingDoctor && (
        <DoctorForm
          initialData={editingDoctor}
          onSubmit={handleUpdate}
          onCancel={() => setEditingDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorList;
