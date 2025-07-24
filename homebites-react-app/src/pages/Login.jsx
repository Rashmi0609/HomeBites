import '../styles/login.css';
import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false); 
  // NEW: State to manage which form is shown: 'email' or 'otp'
  const [loginMode, setLoginMode] = useState('email');
  const navigate = useNavigate();

  // Your existing server logic for email login is preserved
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return alert("Please enter both email and password.");
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate('/dishes');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

<<<<<<< HEAD
  // NEW: Handler for the OTP form. You will add your server logic here later.
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    if (!phone) {
        return alert("Please enter a phone number.");
    }
    alert(`OTP request sent to ${phone}. (Backend logic needed)`);
    // TODO: Add your fetch call to your backend OTP endpoint here
  };
=======
if (response.ok) {
  alert("Login successful!");
  window.location.href = "/dishes"; // <--- updated here
} else {
  alert(data.message || "Login failed");
}

} catch (error) {
console.error("Login error:", error);
alert("An error occurred. Please try again.");
}
};
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227

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

          {/* --- MODIFIED: Form rendering is now conditional --- */}
          {loginMode === 'email' ? (
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
            </form>
          ) : (
            <form id="otp-form" className="login-form" onSubmit={handleOtpLogin}>
              <div className="input-group">
                <input type="tel" name="phone" required placeholder=" " id="phone" />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <button type="submit" className="login-btn">Send OTP</button>
            </form>
          )}

          <div className="divider">
            <span>or continue with</span>
          </div>

          {/* --- MODIFIED: Buttons are now outside the form and updated --- */}
          <div className="social-buttons">
            <button
              type="button"
              className="social-btn"
              onClick={() => window.open("http://localhost:5000/auth/google", "_self")}
            >
              <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /> Google
            </button>
            
            {/* NEW: Button to toggle between login modes */}
            <button 
              type="button" 
              className="social-btn" 
              onClick={() => setLoginMode(prevMode => prevMode === 'email' ? 'otp' : 'email')}
            >
              {/* Using emojis as simple icons */}
              {loginMode === 'email' ? '📞' : '✉️'}
              {loginMode === 'email' ? ' Login with Number' : ' Login with Email'}
            </button>
          </div>

          <div className="signup-link">
            Don’t have an account? <Link to="/register" id="create-account-link">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
