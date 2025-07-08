// src/components/CreateAccountPage.jsx
import React, { useState } from 'react';
import { createAccount } from '../Api';

const CreateAccountPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setSuccess(false); // Reset success state
    try {
      const result = await createAccount(fullName, email, password);
      if (result.success) {
        setSuccess(true);
        alert('Account created successfully');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setError('Failed to create account');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Create Account</h2>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>
          Full Name:
          <input
            type="text"
            value={fullName}
            placeholder='Full Name'
            onChange={(e) => setFullName(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>
          Email ID:
          <input
            type="email"
            value={email}
            placeholder='Email Id'
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>
          Password:
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
      </div>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>Account created successfully!</div>}
      <button type="submit" style={submitButtonStyle}>
        Create Account with Email
      </button>
      <button type="button" style={googleButtonStyle}>
        Continue with Google
      </button>
      <hr style={dividerStyle} />
      <p style={{ textAlign: 'center' }}>
        Already have an account? <a href="/login" style={linkStyle}>Login</a>
      </p>
    </form>
  );
};

const formStyle = {
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  margin: 'auto',
  marginTop: '8rem',
  marginBottom:'5.7rem',
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

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#1E293B',
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

const submitButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  width: '100%',
  marginBottom: '16px',
  border: 'none',
};

const googleButtonStyle = {
  backgroundColor: '#DB4437',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  width: '100%',
  marginBottom: '16px',
  border: 'none',
};

const dividerStyle = {
  margin: '16px 0',
};

const linkStyle = {
  color: '#3B82F6',
  textDecoration: 'none',
};

export default CreateAccountPage;
