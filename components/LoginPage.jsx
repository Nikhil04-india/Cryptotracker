// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { login } from '../Api'; // Import the login API call

const SocialLoginButton = () => (
  <React.Fragment>
    <button style={socialButtonStyle()} type="button">
      <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px', color: 'white' }} />
      <span>Continue with Google</span>
    </button>
  </React.Fragment>
);

const socialButtonStyle = () => ({
  backgroundColor: '#EF4444',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
  border: 'none',
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error
    setSuccess(false); // Reset success state

    try {
      const response = await login(email, password);
      if (response.success) {
        setSuccess(true);
        console.log('Login successful:', response.token);
        // Handle successful login, e.g., redirect to dashboard or save token
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Login error. Please try again.');
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Sign In</h2>
      <div style={inputContainerStyle}>
        <input
          type="email"
          style={inputStyle}
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={inputContainerStyle}>
        <input
          type="password"
          style={inputStyle}
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>Login successful!</div>}
      <div style={checkboxContainerStyle}>
        <input type="checkbox" style={{ marginRight: '8px' }} id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" style={loginButtonStyle}>
        Log In
      </button>
      <button type="button" style={forgotPasswordButtonStyle}>
        Forget your password?
      </button>
      <div style={dividerContainerStyle}>
        <hr style={dividerStyle} />
        <span style={dividerTextStyle}>Or</span>
      </div>
      <SocialLoginButton />
    </form>
  );
};

const formStyle = {
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '400px',
  margin: 'auto',
  marginTop: '8rem',
  marginBottom: '8rem',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '24px',
  textAlign: 'center',
  color: '#1E293B',
};

const inputContainerStyle = {
  marginBottom: '16px',
};

const inputStyle = {
  width: '100%',
  backgroundColor: '#DBEAFE',
  minHeight: '48px',
  lineHeight: '40px',
  padding: '8px 16px',
  borderRadius: '8px',
  outline: 'none',
  border: '1px solid transparent',
  transition: 'border-color 0.2s',
};

const errorStyle = {
  color: 'red',
  marginBottom: '16px',
};

const successStyle = {
  color: 'green',
  marginBottom: '16px',
};

const checkboxContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
};

const loginButtonStyle = {
  backgroundColor: '#312E81',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  width: '100%',
  marginBottom: '16px',
  border: 'none',
};

const forgotPasswordButtonStyle = {
  color: '#3B82F6',
  padding: '8px 16px',
  borderRadius: '8px',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  marginBottom: '16px',
};

const dividerContainerStyle = {
  position: 'relative',
  marginBottom: '16px',
};

const dividerStyle = {
  borderTop: '1px solid #E5E7EB',
};

const dividerTextStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '0 8px',
  color: '#1E293B',
};

export default LoginPage;
