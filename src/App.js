import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider}  from './components/AuthContext';

import Register from './components/Register';
import Login from './components/Login';
import DoctorList from './components/DoctorList';
import PatientList from './components/PatientList';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import MappingManager from './components/MappingManager';
import DoctorForm from './components/DoctorForm';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute>
                                                 <Dashboard/>
                                             </ProtectedRoute>}/>
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <DoctorList />
              </ProtectedRoute>
            }
          />
          <Route
               path="/doctor-form"
               element={
              <ProtectedRoute>
              <DoctorForm onSubmit={() => window.location.href = '/doctors'} />
              </ProtectedRoute>
               }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
            }
          />
          <Route
           path='/mappings'
           element={
             <ProtectedRoute>
              <MappingManager/>
             </ProtectedRoute>
           }
           />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
