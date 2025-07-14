import '../styles/Register.css'; // make sure this matches your folder structure
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add form validation and API call
  };

  return (
    <div style={{ backgroundColor: '#FFFAF7', minHeight: '100vh' }}>
      <div id="page" className="container fade-in">
        <div className="signup-card">
          <div className="brand">
            <div className="logo-circle">H</div>
            <div className="brand-text">Home Bites</div>
            <div className="tagline">Create your account to enjoy Ghar ka khana ❤</div>
          </div>

          <h2 className="welcome-title">Sign Up</h2>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                required
                placeholder=" "
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="firstName">First Name</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="lastName"
                required
                placeholder=" "
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                required
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="address"
                required
                placeholder=" "
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="address">Address</label>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                required
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
              />
              <label htmlFor="phone">Contact Number</label>
            </div>

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>

          <div className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
