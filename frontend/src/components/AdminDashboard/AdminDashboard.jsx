import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import '../Auth/signup.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    orgName: '',
    password: '',
  });
  const [userType, setUserType] = useState('dev');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    setSuccessMessage('');
  
    const dataToSend = { ...formData };
    delete dataToSend._id;
  
    if (userType === 'dev') {
      delete dataToSend.orgName; 
    }
  
    try {
      const url = formData._id 
        ? `http://localhost:8000/api/admin/users/${formData._id}` 
        : 'http://localhost:8000/api/users/register';
      const method = formData._id ? 'put' : 'post';
  
      const response = await axios[method](url, dataToSend);
      setSuccessMessage(formData._id ? 'User updated successfully' : 'User added successfully');
      setTimeout(() => {
        fetchUsers();
        setShowForm(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (user) => {
    setFormData({ ...user });
    setUserType(user.orgName ? 'org' : 'dev');
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="signup-container">
      <h3 className="user-list-title">All Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th className="user-table-header">Name</th>
            <th className="user-table-header">Email</th>
            <th className="user-table-header">State</th>
            <th className="user-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="user-table-cell">{user.firstName} {user.lastName}</td>
              <td className="user-table-cell">{user.email}</td>
              <td className="user-table-cell">{user.state}</td>
              <td className="user-table-cell">
                <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="add-user-link">
          Add a new user
        </button>
      )}

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 

      {showForm && (
        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label className="form-label">User Type</label>
            <select className="form-input" onChange={handleUserTypeChange} value={userType}>
              <option value="dev">Developer</option>
              <option value="org">Organization</option>
            </select>
          </div>

          {userType === 'org' && (
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input
                className="form-input"
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">State</label>
            <input
              className="form-input"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button className="form-button" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : formData.userId ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;


