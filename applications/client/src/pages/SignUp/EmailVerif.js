import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';

const VerificationMessage = ({ email }) => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#355E3B', 
      }}
    >
      <Paper
  elevation={6}
  square
  sx={{
    backgroundColor: '#fff',
    padding: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '500px',
    height: '300px',
    borderRadius: '0.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
    <h3>Verification email sent</h3>
  </Box>
  <Typography variant="body1" gutterBottom>
    A verification link has been sent to {email}. This email contains a link that you'll need to click to complete the registration process.
  </Typography>
  <Typography>
    Please check your inbox and spam folder to ensure you receive the email. If you don't see it within a few minutes, please wait and try again.
  </Typography>
</Paper>
    </Grid>
  );
};

export default VerificationMessage;
