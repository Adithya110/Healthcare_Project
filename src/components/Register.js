import React, { useState } from 'react';
import "../cssfiles/register.css"

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      username: username,
      email: email,
      password: password
    }),
    });

    if (res.ok) {
      alert('User registered successfully!');
      window.location.href = '/login';
    } else {const error = await res.json();
             console.log(error);
            alert('Registration failed!');
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} onChange={e => setUsername(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} onChange={e => setEmail(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} onChange={e => setPassword(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
