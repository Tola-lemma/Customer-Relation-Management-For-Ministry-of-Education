import React, { useState } from 'react';
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

export const OpenTicket = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    phoneNum: '',
    email: '',
    txtArea: '',
    selectedProblem: '',
    selectedFile: null,
    selectedFiles: [],
    errors: {},
  });

  const { fullName, phoneNum, email, txtArea, selectedProblem, selectedFile, selectedFiles, errors } = formState;

  const validateForm = () => {
    let formErrors = {};

    if (!fullName.trim()) {
      formErrors.fullName = 'Enter Your Full Name';
    }

    if (!phoneNum.trim()) {
      formErrors.phone = 'Enter Your Phone Number';
    } else if (!/^\d+$/.test(phoneNum.trim())) {
      formErrors.phone = 'Invalid Phone Number';
    }

    if (!email.trim()) {
      formErrors.email = 'Enter Working Email Address';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      formErrors.email = 'Invalid Email Address';
    }

    if (!selectedProblem) {
      formErrors.problem = 'Select Your Problem';
    }

    if (!selectedFile && selectedFiles.length === 0) {
      formErrors.file = 'Upload a File';
    }

    if (!txtArea.trim()) {
      formErrors.textArea = "Don't forget to write your problem summary";
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: formErrors,
    }));

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission
      console.log('Form submitted successfully');
      // Reset form fields and state
      setFormState({
        fullName: '',
        phoneNum: '',
        email: '',
        txtArea: '',
        selectedProblem: '',
        selectedFile: null,
        selectedFiles: [],
        errors: {},
      });
    }
  };

  const handleReset = () => {
    setFormState({
      fullName: '',
      phoneNum: '',
      email: '',
      txtArea: '',
      selectedProblem: '',
      selectedFile: null,
      selectedFiles: [],
      errors: {},
    });
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
                value={fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Box>

            <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
              <TextField
                fullWidth
                label='Phone Number'
                id='phoneNumumeber'
                type='number'
                value={phoneNum}
                onChange={(e) => setFormState({ ...formState, phoneNum: e.target.value })}
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
                value={email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            <FormControl sx={{ width: 600, maxWidth: '100%', mt: 2 }}>
              <InputLabel htmlFor='grouped-native-select'>Select Your Problem</InputLabel>
              <Select
                native
                defaultValue=''
                id='grouped-native-select'
                label='Select your problem'
                onChange={(e) => setFormState({ ...formState, selectedProblem: e.target.value })}
                error={!!errors.problem}
              >
                <option aria-label='None' value='' />
                <option value={1}>Student transfer request</option>
                <option value={2}>Teacher transfer request</option>
                <option value={3}>Scholarship Question</option>
                <option value={4}>Request to return to work after studying abroad</option>
                <option value={5}>Various academic and administrative complaints</option>
              </Select>
              {errors.problem && <p style={{ color: 'red', display: 'inline' }}>{errors.problem}</p>}
            </FormControl>

            <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
              <UploadFile />
            </Box>

            <Box sx={{ width: 600, maxWidth: '100%', mt: 2 }}>
              <TextField
                id='outlined-multiline-static'
                label=' Summary'
                multiline
                rows={4}
                fullWidth
                value={txtArea}
                onChange={(e) => setFormState({ ...formState, txtArea: e.target.value })}
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
      <Footer />
    </div>
  );
};

export default OpenTicket;
