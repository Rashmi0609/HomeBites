import '../styles/Login.css';
import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      navigate('/dishes');
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: '#FFFAF7', minHeight: '100vh' }}>
      <div id="page" className="container fade-in">
        <div className="login-card">
          <div className="brand">
            <div className="logo-circle">H</div>
            <div className="brand-text">Home Bites</div>
            <div className="tagline">City Moms, Cooking with Love</div>
          </div>

          <h2 className="welcome-title">Welcome Back</h2>

          <form id="login-form" className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input type="email" name="email" required placeholder=" " id="email" />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder=" "
                id="password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="forgot-pass">
              <a href="#" id="forgot-password-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">Log In</button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-btn">
                <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /> Google
              </button>
              <button type="button" className="social-btn">
                <img src="https://img.icons8.com/fluency/24/facebook-new.png" alt="Facebook" /> Facebook
              </button>
              <button type="button" className="social-btn">
                <img src="https://img.icons8.com/ios-filled/24/mac-os.png" alt="Apple" /> Apple
              </button>
            </div>

            <div className="signup-link">
              Don’t have an account? <Link to="/register" id="create-account-link">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

