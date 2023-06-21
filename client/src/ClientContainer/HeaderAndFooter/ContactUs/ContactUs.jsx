import React from 'react'
import './ContactUs.css'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { createMuiTheme, ThemeProvider } from '@mui/material';
import { NavBar } from '../header/NavBar';
import { Footer } from '../header/Footer/Footer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0000", // Set your desired primary color
    },
    secondary: {
      main: "#00ff00", // Set your desired secondary color
    },
    Third: {
      main: "#87ceeb", // Set your desired secondary color
    },
  },
});
const theme1 = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "2px solid #ff0000", // Set your desired border color
        },
        "&:hover:not($disabled):before": {
          borderBottom: "2px solid #00ff00", // Set your desired border color on hover
        },
      },
    },
  },
});
function ContactUs() {
  return (
  <>
  
  <div className="App"> 
     <NavBar/>
      <Grid>
        <Card style={{ maxWidth: 600, padding: "20px 5px", margin: "0 auto", marginTop:"10px"}}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Contact Us
          </Typography> 
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill up the form and our team will get back to you within 24 hours.
          </Typography> 
            <form>
              <Grid container spacing={1}>
                <ThemeProvider theme={theme1}>
                <Grid xs={12} sm={6} item>
                  <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="text" placeholder="Enter your company" label="Company Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
                </Grid>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" >Submit</Button>
                </Grid>
                </ThemeProvider>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
    <Footer/>
  </>

  )
}

export default ContactUs