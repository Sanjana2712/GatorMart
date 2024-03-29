import React, {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { TextField } from "@mui/material";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =useState("");

  const handleSubmit = async (e) => {
    try{
    
      const emailRe = /\S+@sfsu.edu/ 
      e.preventDefault();
      if(emailRe.test(email) && (fullname) && (password)&& (confirmPassword)&& (email)&&( password===confirmPassword)){
        const data = {
          fullname,
          email,
          password,
        };
        
        console.log(data)
        const result = await axios.post('http://localhost:4000/api/register',data,{headers:{'Content-Type':'application/json'}});
        if(result.data.status === 'success'){
          navigate('/')
        }
  };} catch(err){
    console.log(err);}}
    
  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/002/788/700/original/woman-shopping-online-on-laptop-illustration-online-store-payment-bank-credit-cards-digital-pay-technology-e-paying-flat-style-modern-illustration-vector.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
             <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            
            <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
   
       <TextField  margin="normal" type="text" fullWidth placeholder="Full Name" required onChange={(e)=> setFullname(e.target.value)}/>
       <TextField  margin="normal" type="email" fullWidth placeholder="SFSU Email"onChange={(e)=> setEmail(e.target.value)}/>
       <TextField  margin="normal" type="password" fullWidth onChange={(e)=> setPassword(e.target.value)} required placeholder="Password" />
       <TextField  margin="normal" type="password" fullWidth onChange={(e)=> setConfirmPassword(e.target.value)}required placeholder="Confirm Password" />
    
          <Button
            type="submit"
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor:'black'}}
          >
            Sign Up
          </Button>
          </form>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
        </Grid>
      
          </Box>
        </Grid>
      </Grid>
  );
}