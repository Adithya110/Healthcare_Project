import React from 'react';
import { Link } from 'react-router-dom';
import '../cssfiles/Navbar.css'

function Navbar() {
  const token=localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/home">Home</Link> |{" "}
      {!token &&<><Link to="/register">Register</Link> |{" "}</>}
      {!token &&<><Link to="/login">Login</Link> </>}
      {token&&<><Link to="/doctors">Doctors</Link> |{" "}
      <Link to="/patients">Patients</Link> |{" "}
      <Link to="/mappings">Create Mappings</Link> |{" "}
      <button onClick={handleLogout}>Logout</button></>}
    </nav>
  );
}

export default Navbar;
