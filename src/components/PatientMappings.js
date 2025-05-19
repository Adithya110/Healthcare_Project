import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';


const PatientMappings = ({ patientId, patient }) => {
  const { token } = useContext(AuthContext);
  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    if (!patientId) return;

    fetch(`http://localhost:8000/api/mappings/${patientId}/doctors/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setMappings(data))
      .catch(err => console.error(err));
  }, [patientId, token]);

  const handleDeletion = (mappingId) => {
    fetch(`http://localhost:8000/api/mappings/${mappingId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          setMappings(prev => prev.filter(m => m.id !== mappingId));
          alert("Mapping Deleted Successfully");
        } else {
          throw new Error("Deletion Failed");
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h3>Mapped Doctors for: {patient?.name}</h3>
      <ul>
        {mappings.map(doc => (
          <li key={doc.id}>
            {doc.doctor_name}
            <button
              onClick={() => handleDeletion(doc.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete Mapping
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientMappings;
