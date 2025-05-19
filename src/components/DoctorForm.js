import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssfiles/DoctorForm.css';

function DoctorForm({ initialData=null, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSpecialization(initialData.specialization || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `http://127.0.0.1:8000/api/doctors/${initialData.id}/`
      : 'http://127.0.0.1:8000/api/doctors/';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: name, specialization: specialization }),
    });

    if (res.ok) {
      const data = await res.json();
      alert('Doctor saved successfully!');
      onSubmit(data);
    } else {
      alert('Error saving doctor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="doctor-form">
      <h3>{initialData ? 'Update' : 'Create'} Doctor</h3>
      <input
        type="text"
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        required
      />
      <div className="button-group">
        <button type="submit">{initialData ? 'Update' : 'Create'}</button>
        <button
          type="button"
          onClick={() => {
            if (onCancel) onCancel();
            navigate("/doctors");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DoctorForm;
