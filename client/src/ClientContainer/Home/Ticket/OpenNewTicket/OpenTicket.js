import * as React from 'react';
import { useState } from 'react';
import { NavBar } from "../../../HeaderAndFooter/header/NavBar";
import './OpenTicket.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography } from '@mui/material';
//import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Footer } from '../../../HeaderAndFooter/Footer/Footer';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import UploadFile from './UploadFile';

export const OpenTicket = () => {

  const schema=yup.object().shape({
    fullName:yup.string().required("Enter Your Full Name"),
    phone:yup.number().positive().integer().min(10).required().typeError("Enter Your Phone Number"),
    email:yup.string().email().required("Enter Workig Email Address"),
    Selection:yup.string().required("Select Your Problem Here"),
    textArea:yup.string().required("Don't forget to write your problem summary"),
    Attachment:yup.string().required("select your file")
    
  })
  const {register, handleSubmit, formState:{errors}}=useForm({
    resolver:yupResolver(schema),
  });
  const onSubmit=(data)=>{
    console.log(data);
  }
const [fullName, setFullName] = useState('');
const [phoneN, setPhoneN] = useState('');
const [email, setEmail] = useState('');
const [txtArea, setTxtArea] = useState('');
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='' >
      <NavBar />
      <div className='container all-container'>
      <>
      <Typography variant='h1'>Ask New Questions</Typography>
      <Typography variant='h3'>Please fill out this form to submit your problem.</Typography>
      <Box sx={{width:600, maxWidth:'100%', marginTop:2}}>
        <TextField fullWidth 
         label='Full Name' 
         id='fullName' 
         type='name' 
         {...register("fullName")}
         value={fullName}
         onChange={e=>setFullName(e.target.value)}
        >
        </TextField>
        <p style={{color:"red", display:'inline'}}>{errors.fullName?.message}</p>
      </Box>

      <Box sx={{width:600, maxWidth:'100%', marginTop:2}}>
        <TextField fullWidth 
        label='Phone Number'
         id='phoneNumeber' 
         type='number'
         {...register("phone")}
         value={phoneN}
         onChange={e=>setPhoneN(e.target.value)} 
          >
        </TextField>
        <p style={{color:"red", display:'inline'}}>{errors.phone?.message}</p>
      </Box>
      <Box sx={{width:600, maxWidth:'100%', marginTop:2}}>
        <TextField fullWidth 
        label='Email' 
        id='email' 
        type='email'
        {...register("email")}
        value={email}
        onChange={e=>setEmail(e.target.value)}
        >
        </TextField>
        <p style={{color:"red", display:'inline'}}>{errors.email?.message}</p>
      </Box>

      <FormControl sx={{ width:600, maxWidth:'100%', mt:2}}>
      <InputLabel htmlFor="grouped-native-select">Select Your Problem</InputLabel>
      <Select native defaultValue="" id="grouped-native-select" label="Select your problem" 
      {...register("Selection")}>
          <option aria-label="None" value="" />
            <option value={1}>Student transfer request</option>
            <option value={2}>Teacher transfer request</option>
            <option value={3}>Scholarship Question</option>
            <option value={4}>Request to return to work after studing abroad</option>
            <option value={3}>Varios acadamic and adiminstrative complaints</option>
        </Select>
        {errors.Selection && <p style={{color:"red", display:'inline'}}>{errors.Selection?.message}</p>}
      </FormControl>

      <Box sx={{width:600,  maxWidth:'100%', marginTop:2}}>
        
       <UploadFile/>
      {/* <p style={{color:"red", display:'inline'}}>{errors.Attachment?.message}</p> */}
      </Box>

      <Box sx={{ width:600, maxWidth:'100%', mt:2}}>
      <TextField id="outlined-multiline-static" label=" Summary" 
        multiline 
        rows={4} 
        fullWidth
        value={txtArea}
        {...register("textArea")}
        onChange={e=>setTxtArea(e.target.value)}>
      </TextField>
      <p style={{color:"red", display:'inline'}}>{errors.textArea?.message}</p>
      </Box>
      
      

      <Stack direction='row' spacing={2} mt={2}  mb={2} mr={4} size='large'>
      <Button type='submit' variant='contained' color='success' size='large'  >
        Create Ticket</Button>
      <Button type='reset' variant='contained' color='success' size='large' >
        Reset</Button>
      </Stack>
      </>
      </div>
       
    </div>
    </form>
    <Footer/>
    </div>
   
  );
};
