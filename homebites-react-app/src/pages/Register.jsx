import axios from 'axios';
import '../styles/Register.css'; // Make sure this path is correct
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    // FIX: Changed 'phone' to 'contactNumber'
    contactNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use the reverted /register endpoint
      await axios.post('http://localhost:5000/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        // FIX: Changed payload key to 'contactNumber'
        contactNumber: formData.contactNumber
      });

      alert('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
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
              <input type="text" name="firstName" required placeholder=" " value={formData.firstName} onChange={handleChange} />
              <label>First Name</label>
            </div>
            <div className="input-group">
              <input type="text" name="lastName" required placeholder=" " value={formData.lastName} onChange={handleChange} />
              <label>Last Name</label>
            </div>
            <div className="input-group">
              <input type="email" name="email" required placeholder=" " value={formData.email} onChange={handleChange} />
              <label>Email Address</label>
            </div>
            <div className="input-group">
              <input type="password" name="password" required placeholder=" " value={formData.password} onChange={handleChange} />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input type="text" name="address" required placeholder=" " value={formData.address} onChange={handleChange} />
              <label>Address</label>
            </div>
            <div className="input-group">
              {/* FIX: Updated name and value for the contact number input */}
              <input type="tel" name="contactNumber" required placeholder=" " value={formData.contactNumber} onChange={handleChange} />
              <label>Contact Number</label>
            </div>
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
          <div className="signup-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;