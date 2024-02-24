import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import {useState, useContext, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Sidebar from '../../components/sidebar';
import Button from 'react-bootstrap/esm/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit'; // Import edit icon
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import camera icon


const drawerWidth = 240;

export default function Account(props) {
  let firstName =null;
  firstName = sessionStorage.getItem('fullname');
  const [email, setEmail] = useState();
  const [editProfile, setEditProfile] = React.useState(false);
  const [profileUrl, setProfileUrl] = React.useState(sessionStorage.getItem('profile_url'));
  const handleEditClick = () => {
    document.getElementById('avatar-input').click();
  };

  const handleImageChange = async (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      try {
      let reader = new FileReader();
      reader.readAsDataURL(selected);
          const formData = new FormData();
          formData.append('image',selected);
          formData.append('userId', props.user);
          const result = await axios.post('http://localhost:4000/api/imgupload',formData,{headers:{'Content-Type':'multipart/form-data'}});
          console.log(result)
          setProfileUrl(result.data.api2_profile_url); 
          sessionStorage.setItem('profile_url', result.data.api2_profile_url);

        } catch (error) {
          console.error('Image upload error:', error);
        }
    } 
  };


const getUserInfo = async (e) => {
  try{
  
    const userResponse = await axios.post('http://localhost:4000/api/userinfo',{userId:props.user});
    setEmail(userResponse.data.email);
      }
 catch(err){
  console.log(err);}}
  getUserInfo()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    <Sidebar/>
      <Box component="main">   
      <label htmlFor="avatar-input">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                marginLeft: '29rem',
                marginTop: '4rem',
                color: 'white',
                borderRadius: '12rem',
                cursor: 'pointer',
              }}
              src={profileUrl}
              alt="Profile"
              onClick={handleEditClick}
            />
           
            <input
              id="avatar-input"
              type="file"
              accept="image/*, png, jpeg, jpg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
              onChange={handleImageChange}
            />
            </div>
            </label>

        <Box sx={{ marginLeft: '2rem', marginTop: '2rem' }}>
          <Typography margin="normal" variant="h5">Account Details</Typography>
          <Typography margin="normal" variant="body1">
            <strong>First Name:</strong> {firstName}
          </Typography>
          <Typography margin="normal" variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
