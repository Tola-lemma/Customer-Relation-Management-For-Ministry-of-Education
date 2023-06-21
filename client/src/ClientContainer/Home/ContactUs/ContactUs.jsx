import React, { useState } from 'react';
import { NavBar } from '../../HeaderAndFooter/header/NavBar';
import { Footer } from '../../HeaderAndFooter/header/Footer/Footer';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    country: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  // Destructure form data values
  const { firstName, lastName, companyName, email, country, phoneNumber, subject, message } = formData;

  // Update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <NavBar />
      <h1 style={{ color: '#0072bc', textAlign: 'center',marginTop:"2rem",marginBottom:"2rem" }}>Contact Us</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ boxShadow: 3, p: 4, width: '70%' }}>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6 mt-2'>
              <TextField
                label='First Name'
                name='firstName'
                value={firstName}
                onChange={handleInputChange}
                required
                fullWidth
                style={{ marginBottom: '2rem' }}
              />
            </div>
            <div className='col-md-6 mt-2'>
              <TextField
                label='Last Name'
                name='lastName'
                value={lastName}
                onChange={handleInputChange}
                required
                fullWidth
                style={{ marginBottom: '2rem' }}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <TextField
                label='Company Name (optional)'
                name='companyName'
                value={companyName}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: '2rem' }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                label='Email'
                name='email'
                value={email}
                onChange={handleInputChange}
                required
                fullWidth
                style={{ marginBottom: '2rem' }}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <TextField
                label='Country (optional)'
                name='country'
                value={country}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: '2rem' }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                label='Phone Number (optional)'
                name='phoneNumber'
                value={phoneNumber}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: '2rem' }}
              />
            </div>
          </div>
          <TextField
            label='Subject'
            name='subject'
            value={subject}
            onChange={handleInputChange}
            required
            fullWidth
            style={{ marginBottom: '2rem' }}
          />
          <TextField
            label='Your Message'
            name='message'
            multiline
            rows={5}
            value={message}
            onChange={handleInputChange}
            required
            fullWidth
            style={{ marginBottom: '2rem' }}
          />
          <button
            type='submit'
            className='btn btn-primary rounded-pill'
            style={{width:"16%",marginLeft:"40%"}}
          >
            Submit
          </button>
        </form>
        </Box>
        </Box>
      <Footer />
    </div>
  );
};
