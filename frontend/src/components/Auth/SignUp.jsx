import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    state: '',
    orgName: '',
  });
  const [userType, setUserType] = useState('dev');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const dataToSend = { ...formData };
    if (userType === 'dev') {
        delete dataToSend.orgName;
    }

    try {
        const response = await axios.post('http://localhost:8000/api/users/register', dataToSend);
        localStorage.setItem('token', response.data.token);
        navigate('/');
    } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className='signup-form'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>User Type</label>
          <select onChange={handleUserTypeChange} value={userType}>
            <option value="dev">Developer</option>
            <option value="org">Organization</option>
          </select>
        </div>

        {userType === 'org' && (
          <div>
            <label>Organization Name</label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

