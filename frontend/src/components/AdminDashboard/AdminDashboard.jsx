import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';

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
  const [successMessage, setSuccessMessage] = useState('');
  const [currentView, setCurrentView] = useState('usersList'); // Track current view (Add User or Users List)

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
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
        setCurrentView('usersList'); // Switch back to the Users List after adding/updating
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
    setCurrentView('addUser'); // Switch to Add User view when editing
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
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Admin Dashboard</h3>
        <ul>
          <li onClick={() => setCurrentView('usersList')} className={currentView === 'usersList' ? 'active' : ''}>
            Users List
          </li>
          <li onClick={() => setCurrentView('addUser')} className={currentView === 'addUser' ? 'active' : ''}>
            Add User
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {currentView === 'usersList' && (
          <>
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
          </>
        )}

        {currentView === 'addUser' && (
          <>
            <h3 className="form-title">{formData._id ? 'Edit User' : 'Add User'}</h3>
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
                  {loading ? 'Submitting...' : formData._id ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;









