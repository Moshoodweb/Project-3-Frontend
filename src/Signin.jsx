import React, { useState, useEffect } from 'react';
import './Signin.css'
import logo from './assets/moshood-foods-logo.svg';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');
  const passwordsMatch = formData.password === formData.confirmPassword;
  const canSubmit = isFormComplete && passwordsMatch;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  useEffect(() => {
    localStorage.setItem('moshood-registration', JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone
    }));
  }, [formData.firstName, formData.lastName, formData.email, formData.phone]);

  return (
    <div className="signin-page">
      <form className="form">
        <div className="brand-logo-wrap">
          <img src={logo} alt="Moshood Foods" className="brand-logo" />
        </div>
        <p className="title">Signin </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input required placeholder type="text" className="input" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            <span>Firstname</span>
          </label>
          <label>
            <input required placeholder type="text" className="input" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            <span>Lastname</span>
          </label>
        </div>  
        <label>
          <input required placeholder type="email" className="input" name="email" value={formData.email} onChange={handleInputChange} />
          <span>Email</span>
        </label>
        <label>
          <input required placeholder type="tel" className="input" name="phone" value={formData.phone} onChange={handleInputChange} />
          <span>Phone</span>
        </label> 
        <label className="password-field">
          <input
            required
            placeholder
            type={showPassword ? 'text' : 'password'}
            className="input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span>Password</span>
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <label className="password-field">
          <input
            required
            placeholder
            type={showPassword ? 'text' : 'password'}
            className="input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <span>Confirm password</span>
        </label>
        {!passwordsMatch && formData.confirmPassword.trim() !== '' && (
          <p style={{ color: '#ba1a1a', margin: '-6px 0 8px', fontSize: '13px' }}>
            Password and confirm password must match.
          </p>
        )}
        <Link
          to="/dashboard"
          className={`submit ${canSubmit ? '' : 'submit-disabled'}`}
          onClick={(event) => {
            if (!canSubmit) {
              event.preventDefault();
              return;
            }
          }}
          aria-disabled={!canSubmit}
        >
          Submit
        </Link>
        </form>
    </div>
  );
}

export default Signin;
