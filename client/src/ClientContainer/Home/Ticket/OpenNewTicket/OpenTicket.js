
import React, { useContext } from 'react';
import { useState } from 'react';
import { NavBar } from '../../../HeaderAndFooter/header/NavBar';
import './OpenTicket.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography } from '@mui/material';
import { Footer } from '../../../HeaderAndFooter/footer/Footer';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import UploadFile from './UploadFile';
import axios from 'axios';
import { ErrorContext } from '../../../Admin/ToastErrorPage/ErrorContext';
import { ErrorMessage } from '../../../Admin/ToastErrorPage/ErrorMessage';

export const OpenTicket = () => {
  const { showError,showSuccess } = useContext(ErrorContext);
  const initialFormState = {
    fullName: '',
    phoneN: '',
    email: '',
    txtArea: '',
    selectedProblem: '',
    selectedFile: null,
    selectedFiles: [],
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    let formErrors = {};
  
    if (!formData.fullName.trim()) {
      formErrors.fullName = 'Enter Your Full Name';
    }
  
    if (!formData.phoneN.trim()) {
      formErrors.phone = 'Enter Your Phone Number';
    } else if (!/^\d+$/.test(formData.phoneN.trim())) {
      formErrors.phone = 'Invalid Phone Number';
    }
  
    if (!formData.email.trim()) {
      formErrors.email = 'Enter Working Email Address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      formErrors.email = 'Invalid Email Address';
    }
  
    if (!formData.selectedProblem) {
      formErrors.problem = 'Select Your Problem';
    }
  
    // if (!formData.selectedFile && formData.selectedFiles.length === 0) {
    //   formErrors.file = 'Upload a File';
    // }
  
    if (!formData.txtArea.trim()) {
      formErrors.textArea = "Don't forget to write your problem summary";
    }
  
    setErrors(formErrors);
  
    return Object.keys(formErrors).length === 0;
  };
  const {fullName,phoneN,email,selectedProblem, selectedFiles,} = formData
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const requestBody = {
        name:fullName,
        phoneNumber:phoneN,
        email:email,
        issueDescription: selectedProblem,
        files:selectedFiles 
      }
      
      try {
      const {data: {msg}} = await axios.post("/issue/ticket-issue",requestBody, {
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
          }
      });
      showSuccess("Successfully "+ msg + "!");
    } catch (error) {
        console.log(error?.response?.data?.msg);
        showError(error?.response?.data?.msg || "An error occurred. Please try again.");
  };
      console.log(formData);

      setFormData(initialFormState);
      setErrors({});
    }
  };
  
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };
  return (
    <div>
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className=''>
        <NavBar />
        <div className='container all-container'>
          <Typography variant='h1'>Ask New Questions</Typography>
          <Typography variant='h3'>Please fill out this form to submit your problem.</Typography>
          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
            <TextField
              fullWidth
              label='Full Name'
              id='fullName'
              type='name'
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Box>

          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
            <TextField
              fullWidth
              label='Phone Number'
              id='phoneNumeber'
              type='number'
              value={formData.phoneN}
              onChange={(e) => setFormData({ ...formData, phoneN: e.target.value })}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>

          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
            <TextField
              fullWidth
              label='Email'
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => setFormData({...formData, email:e.target.value})}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>

          <FormControl sx={{ width: 600, maxWidth: '100%', mt: 2 }}>
            <InputLabel htmlFor='grouped-native-select'>Select Your Problem</InputLabel>
            <Select native defaultValue='' id='grouped-native-select' label='Select your problem'
            onChange={e => setFormData({ ...formData, selectedProblem: e.target.value })}
            error={!!errors.problem}>
              <option aria-label='None' value='' />
              <option value="transferRequest">Student transfer request</option>
              <option value="transferRequest">Teacher transfer request</option>
              <option value="studyAbroadRequest">Scholarship Question</option>
              <option value="scholarshipRequest">Request to return to work after studying abroad</option>
              <option value="complaintRequest">Various academic and administrative complaints</option>
            </Select>
            {errors.problem && <p style={{ color: "red", display: 'inline' }}>{errors.problem}</p>}
          </FormControl>

          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
            <UploadFile  
             selectedFiles={formData.selectedFiles}
             setSelectedFiles={formData.setSelectedFiles} 
             />
          </Box>

          <Box sx={{ width: 600, maxWidth: '100%', mt: 2 }}>
            <TextField
              id='outlined-multiline-static'
              label=' Summary'
              multiline
              rows={4}
              fullWidth
              value={formData.txtArea}
              onChange={(e) =>  setFormData({ ...formData, txtArea: e.target.value })}
              error={!!errors.textArea}
              helperText={errors.textArea}
            />
          </Box>

          <Stack direction='row' spacing={2} mt={2} mb={2} mr={4} size='large'>
            <Button type='submit' variant='contained' color='success' size='large'>
              Create Ticket
            </Button>
            <Button type='reset' variant='contained' color='success' size='large'>
              Reset
            </Button>
          </Stack>
        </div>
      </div>
    </form>
    <ErrorMessage />
    <Footer />
  </div>
    
  );
};

export default OpenTicket;

