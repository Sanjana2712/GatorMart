import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Sidebar from '../../components/sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Account(props) {
  const [email, setEmail] = useState('');
  const [profileUrl, setProfileUrl] = useState(localStorage.getItem('profile_url'));
  const firstName = localStorage.getItem('fullname') || 'User';

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userResponse = await axios.post('http://localhost:4000/api/userinfo', { userId: props.user });
        setEmail(userResponse.data.email);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [props.user]);

  const handleEditClick = () => {
    document.getElementById('avatar-input').click();
  };

  const handleImageChange = async (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      try {
        const formData = new FormData();
        formData.append('image', selected);
        formData.append('userId', props.user);
        const result = await axios.post('http://localhost:4000/api/imgupload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProfileUrl(result.data.api2_profile_url);
        localStorage.setItem('profile_url', result.data.api2_profile_url);
      } catch (error) {
        console.error('Image upload error:', error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'background.paper',  borderRadius: 2, p: 3, m: 2 }}>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              color: 'white',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: 1,
              mb: 2,
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
              display: 'none'
            }}
            onChange={handleImageChange}
          />
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 1, fontSize:'15px' }}
            >
              Profile Name
            </Typography>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1}}>
              {firstName}
            </Box>
          </Box>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 1, fontSize:'15px' }}
            >
              Email
            </Typography>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
              {email}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}