import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert } from "@mui/material";

export default function Verify() {
  const { userId, verificationToken } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/verify/${userId}/${verificationToken}`);
        console.log("Verification response:", response.data);
        if (response.data.status) {
          setVerificationStatus(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verifyUser();
  }, [userId, verificationToken]);

  return (
    <div>
      {verificationStatus && (
        <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
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
  <h3>Account Verified Successfully</h3>
</Box>
<Typography variant="body1" gutterBottom>
Congratulations! Your email has been successfully verified. You'll now be directed to our login page to access your account. </Typography>
<Typography variant="body1" gutterBottom>
We're thrilled to have you join our community. If you need any assistance, our support team is here to help. Thank you for choosing us, and happy shopping!
</Typography>
    </Paper>
    </Grid>
      )}
    </div>
  );
}
