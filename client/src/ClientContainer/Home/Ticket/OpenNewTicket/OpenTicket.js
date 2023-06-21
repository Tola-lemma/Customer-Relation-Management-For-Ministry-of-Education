import React, { useContext } from 'react';
import { useState,useRef } from 'react';
import { NavBar } from '../../../HeaderAndFooter/header/NavBar';
import './OpenTicket.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { ErrorContext } from '../../../Admin/ToastErrorPage/ErrorContext';
import { ErrorMessage } from '../../../Admin/ToastErrorPage/ErrorMessage';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import CustomButton from '../../../Admin/Pages/global/Button.jsx'
import { Footer } from '../../../HeaderAndFooter/Footer/Footer';
export const OpenTicket = () => {
  const { showError,showSuccess } = useContext(ErrorContext);
  const initialValue = {
    name: '',
    phoneN: '',
    email: '',
    issueDescription: '',
    serviceType: ''
  };
  
  const [value, setValue] = useState(initialValue);
  const fileInputRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  let {name, email,phoneN,serviceType, issueDescription} = value
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneN);
    formData.append("serviceType", serviceType);
    formData.append( "issueDescription",issueDescription);
    // Get all the selected files
    const files = Array.from(fileInputRef.current.files);
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const allowedType = "application/pdf";

    // Validate each file before appending to FormData
    let isValid = true;
    files.forEach((file) => {
      // Check file size
      if (file.size > maxSize) {
        showError(`File ${file.name} exceeds the maximum allowed size of 5MB.`);
        isValid = false;
        return;
      }
      // Check file type
      if (file.type !== allowedType) {
        showError(`File ${file.name} has an invalid file type. Allowed type: PDF.`);
        isValid = false;
        return;
      }

      formData.append("files", file);
    });

    if (isValid) {
      if (!formData.has("files")) {
        showError("Please select at least one file.");
        return;
      }
      try {
        setUpdating(true);
        const {
          data: { msg },
        } = await axios.post(
          "/issue/ticket-issue",formData
        );
        showSuccess(msg);
        
      } catch (error) {
        showError(error?.response?.data?.msg || "An error occurred during the file upload.");
      }
      finally {
        setUpdating(false); 
     } 
    }
    setValue(initialValue);
  };
  
  const handleReset = () => {
    setValue(initialValue);
  };
  return (
    <div>
     <form onSubmit={onSubmit} onReset={handleReset}>
      <div className=''> 
        <NavBar />
        <div className='container all-container'>
          <Typography variant='h1'>Submit your Issue Here</Typography>
          <Typography variant='h3'>Please fill out this form to submit your Issue.</Typography>
          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
            <TextField
              fullWidth
              label='Full Name'
              id='fullName'
              type='name'
              value={value.fullName}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
          </Box>

          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
          <PhoneInput 
              country="et" 
              value={value.phoneN} 
              onChange={(phone) => setValue({ ...value, phoneN: phone })}
              inputStyle={{ width: '100%', height:'3.4rem' }}
              inputExtraProps={{  
                required: true, 
                autoFocus: true, 
              }} 
              className={"input-phone-number"} 
            />
          </Box>

          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
            <TextField
              fullWidth
              label='Email'
              id='email'
              type='email'
              value={value.email}
              onChange={(e) => setValue({...value, email:e.target.value})}
            />
          </Box>

          <FormControl sx={{ width: 600, maxWidth: '100%', mt: 2 }}>
            <InputLabel htmlFor='grouped-native-select'>Select Your Problem</InputLabel>
            <Select native defaultValue='' id='grouped-native-select' label='Select your Issue'
            onChange={e => setValue({ ...value, serviceType: e.target.value })}
            >
              <option aria-label='None' value='' />
              <option value="transferRequest">Student transfer request</option>
              <option value="transferRequest">Teacher transfer request</option>
              <option value="scholarshipRequest">Scholarship Question</option>
              <option value="studyAbroadRequest">Request to return to work after studying abroad</option>
              <option value="complaintRequest">Various academic and administrative complaints</option>
            </Select>
          </FormControl>

          <Box sx={{ width: 600, maxWidth: '100%', marginTop: 2 }}>
          <input type="file" ref={fileInputRef} multiple />
          </Box>

          <Box sx={{ width: 600, maxWidth: '100%', mt: 2 }}>
            <TextField
              id='outlined-multiline-static'
              label='Summary'
              name="issueDescription"
              multiline
              rows={4}
              fullWidth
              value={value.issueDescription}
              onChange={(e) =>  setValue({ ...value, issueDescription: e.target.value })}
            />
          </Box>
          <Stack direction='row' spacing={2} mt={2} mb={2} mr={4} size='large'>
            <CustomButton type='submit' className="btn btn-success" disabled={updating} loading={updating}> Create Ticket</CustomButton>
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

