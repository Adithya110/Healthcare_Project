import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import PatientMappings from './PatientMappings';
import PatientForm from './PatientForm';
import '../cssfiles/PatientList.css';

const PatientList = () => {
  const { token } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // useCallback to memoize fetchPatients, avoid re-creating on every render
  const fetchPatients = useCallback(() => {
    fetch('http://localhost:8000/api/patients/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error(err));
  }, [token]);

  // fetch patients on component mount and whenever token changes
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleCreate = (formData) => {
    fetch('http://localhost:8000/api/patients/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Creation failed');
      })
      .then(newPatient => {
        alert('Patient created successfully!');
        fetchPatients();   // now works properly here
        setShowCreateForm(false);
      })
      .catch(err => alert(err.message));
  };

  const handleDeletion = (patient) => {
    fetch(`http://localhost:8000/api/patients/${patient.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          alert('Patient deleted successfully!');
          setPatients(prev => prev.filter(p => p.id !== patient.id));
          if (editingPatient?.id === patient.id) {
            setEditingPatient(null);
          }
        } else {
          throw new Error("Deletion Failed");
        }
      })
      .catch(err => alert(err.message));
  };

  const handleUpdate = (formData) => {
    fetch(`http://localhost:8000/api/patients/${editingPatient.id}/`, {
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
      .then(updatedPatient => {
        alert('Patient updated successfully!');
        setPatients(patients.map(p => (p.id === updatedPatient.id ? updatedPatient : p)));
        setEditingPatient(null);
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="patient-list">
      <h2>Patients</h2>
      <button
        onClick={() => {
          setShowCreateForm(true);
          setEditingPatient(null);
        }}
      >
        Create Patient
      </button>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            <span>
              {patient.name} - {patient.age} - {patient.gender}
            </span>
            <button onClick={() => setSelectedPatientId(patient.id)}>Show Mappings</button>
            <button onClick={() => setEditingPatient(patient)}>Edit</button>
            <button id="delete-button"onClick={() => handleDeletion(patient)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedPatientId && (
        <div className="patient-mappings-container">
          <PatientMappings
            patientId={selectedPatientId}
            patient={patients.find(p => p.id === selectedPatientId)}
          />
        </div>
      )}

      {editingPatient && (
        <PatientForm
          initialData={editingPatient}
          onSubmit={handleUpdate}
          onCancel={() => setEditingPatient(null)}
        />
      )}

      {showCreateForm && (
        <PatientForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default PatientList;
