import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { TextField, Alert } from '@mui/material';
import VerificationMessage from './EmailVerif';

export default function SignUp(props) {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessAlert(false);
    setShowErrorAlert(false);

    const emailRe = /\S+@(sfsu\.edu|gmail\.com)/;
    if (
      emailRe.test(email) &&
      fullname &&
      password &&
      confirmPassword &&
      email &&
      password === confirmPassword
    ) {
      const data = {
        fullname,
        email,
        password,
      };

      try {
        await axios.post('http://localhost:4000/api/register', data, {
          headers: { 'Content-Type': 'application/json' },
        });
        setShowSuccessAlert(true);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setShowErrorAlert(true);
          setErrorMessage(err.response.data.message);
        }
      }
    } else {
      setShowErrorAlert(true);
      setErrorMessage('Please fill in all fields correctly.');
    }
  };

  if (showSuccessAlert) {
    return <VerificationMessage email={email} />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://cdn.dribbble.com/users/9239898/screenshots/16501240/media/d2d9e2dba1ffc87b4664dbdbf5d6f5aa.png?resize=1600x1200&vertical=center)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square>
        <Box
          sx={{
            my: 9,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOpenIcon />
          </Avatar>
        
          <Typography component="h1" variant="h5" style={{fontSize:"1.3rem"}}>
            Sign Up
          </Typography>

          {showSuccessAlert && (
        <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
          A verification link has been sent to your email account.
        </Alert>
      )}
      {showErrorAlert && (
        <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
          {errorMessage}
        </Alert>
      )}


          <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
    
            <TextField  
              margin="normal" 
              type="text" 
              fullWidth 
              placeholder="Full Name" 
              required 
              onChange={(e) => setFullname(e.target.value)}
            />
            <TextField  
              margin="normal" 
              type="email" 
              fullWidth 
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField  
              margin="normal" 
              type="password" 
              fullWidth 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Password"
            />
            <TextField  
              margin="normal" 
              type="password" 
              fullWidth 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
              placeholder="Confirm Password"
            />
          
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: 'black',
              '&:hover': {
                bgcolor: '#3b086e', // Change to the desired hover color
              },
            }}
          >
            Verify email
          </Button>
          </form>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" style={{textDecoration:"underline black", color:"black"}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        
        </Box>
      </Grid>
    </Grid>
  );
}
