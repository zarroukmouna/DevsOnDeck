import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp'; 
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />
        } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



