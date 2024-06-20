import './App.css';
// src/App.js

import React, { useState, useEffect } from 'react';

const App = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [attendingWithGuest, setAttendingWithGuest] = useState('No');
  const [guestName, setGuestName] = useState('');

  // State for form validation messages
  const [errors, setErrors] = useState({});

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!name) formErrors.name = 'Name is required';
    if (!email) formErrors.email = 'Email is required';
    else if (!isValidEmail(email)) formErrors.email = 'Email is not valid';
    if (!age) formErrors.age = 'Age is required';
    else if (isNaN(age) || age <= 0) formErrors.age = 'Age must be a number greater than 0';
    if (attendingWithGuest === 'Yes' && !guestName) formErrors.guestName = 'Guest name is required';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      alert(`Form Submitted Successfully!\n
      Name: ${name}\n
      Email: ${email}\n
      Age: ${age}\n
      Attending with Guest: ${attendingWithGuest}\n
      Guest Name: ${guestName}`);
    }
  };

  return (
    <div className="container">
      <h2>Event Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div className="form-group">
          <label>Are you attending with a guest?</label>
          <div>
            <label>
              <input
                type="radio"
                value="Yes"
                checked={attendingWithGuest === 'Yes'}
                onChange={(e) => setAttendingWithGuest(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={attendingWithGuest === 'No'}
                onChange={(e) => setAttendingWithGuest(e.target.value)}
              />
              No
            </label>
          </div>
        </div>
        {attendingWithGuest === 'Yes' && (
          <div className="form-group">
            <label htmlFor="guestName">Guest Name</label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
