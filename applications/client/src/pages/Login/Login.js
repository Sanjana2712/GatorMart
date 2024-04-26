import React, { useContext, useState, useRef, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    const emailRe = /\S+@(sfsu\.edu|gmail\.com)/; 
    e.preventDefault();

    try{ if(emailRe.test(email) && (password)&& (email)){
      const response = await axios.post('http://localhost:4000/api/login',{
        email:email,
        password:password
      });
      console.log(response)
      setShowError(false);
      if(response.data.status === 'success'){
        sessionStorage.setItem('token',response.data.user);
        sessionStorage.setItem('user_id',response.data.user_id);
        sessionStorage.setItem('fullname',response.data.fullname);
        sessionStorage.setItem('profile_url',response.data.profile_url);
        navigate('/')
        props.setUser(response.data.user_id);
       
      }
      else if(response.data.status==='error'){
        setShowError(true);
        setEmail("");
        setPassword("");
      }
      }
      else{
        setShowError(true);
      }
    }  catch (error) {
      // Handle any errors that occur during the login process
      console.error('Login failed', error);
    }
  };

  return (
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.dribbble.com/users/2726519/screenshots/6976043/media/616c902983e025f8a72f9d851cd36f62.png?resize=1600x1200&vertical=center)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          
          <Box
            sx={{
              my: 15,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems:'center'
            }}
          >
             <Avatar sx={{ m: 1.5, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
        
          <Typography component="h1" variant="h5" style={{fontSize:"1.3rem"}}>
            Sign In
          </Typography>
            
            <form onSubmit={handleSubmit} sx={{ mt: 1}} style={{paddingTop:"0.8rem"}}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                onChange={(e)=> setPassword(e.target.value)} required
              />
            
              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor:'black', '&:hover': {
                  bgcolor: '#d6571c', // Change to the desired hover color
                },}}
                
              >
               Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={{textDecoration:"none", color:"black"}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2" style={{textDecoration:"underline black", color:"black"}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            {showError && <p style={{ color: 'red' }}  sx={{ mt: 3, mb: 2}} >Incorrect email or password. Please try again.</p>}
          </Box>
        </Grid>
      </Grid>
      
  );
}