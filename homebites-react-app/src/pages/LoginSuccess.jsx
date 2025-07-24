import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component's only job is to clean up the browser history after a login.
const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // The `replace: true` option is the key.
    // It replaces the current page (/login-success) in the browser's history
    // with the dishes page, effectively removing the Google login page from the history.
    navigate('/dishes', { replace: true });
  }, [navigate]);

  // You can show a simple loading message while the redirect happens.
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FFFAF7' }}>
      <h2>Login Successful! Redirecting...</h2>
    </div>
  );
};

export default LoginSuccess;
