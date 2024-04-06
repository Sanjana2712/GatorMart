import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import logo from '../images/logo2.png';
import Button from '@mui/material/Button';
import { createTheme ,ThemeProvider} from '@mui/material/styles'
import {useState} from 'react'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import  { useNavigate } from 'react-router-dom';

function MYNavbar(props){
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let profile_url =null;
  if(sessionStorage.getItem('profile_url')==null){
    profile_url=null;
  
}else{profile_url=sessionStorage.getItem('profile_url');}
  const theme = createTheme({
    palette: {
     
      secondary: {
 
        main: '#11cbf',
      },
      gator: {
        main: '#6600cc',
        contrastText: '#fff',
      }
    },
    });
   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      
      setAnchorEl(null);
    };
    const handleCloseLogout = () => {
      sessionStorage.clear();
      props.setUser(null);
      navigate('/')
      setAnchorEl(null);
    };
    const handleCloseAddProducts = () => {
      navigate('/addproducts')
      setAnchorEl(null);
    };
    const handleProfile = () => {
      navigate('/profile')
      setAnchorEl(null);
    };
    const handleFav = () => {
      navigate('/favorites')
      setAnchorEl(null);
    };
    const handleSell = () => {
      navigate('/addproducts')
      setAnchorEl(null);
    };
return (
<Navbar bg="navbar navbar-light"  variant="success" expand="lg"  style={{backgroundColor: "#1C1C1C"}}> 
  <Navbar.Brand href="/"><img src={logo} style={{maxWidth:'10rem', marginLeft:'30px'}} alt='Gatormart'></img></Navbar.Brand>
    <Nav className="me-auto">
      <h1  style={{fontSize:'30px', marginLeft:'430px',marginTop:'11px',fontWeight:'revert',color:'white'}}>Gatormart</h1> 
      </Nav>
      <ThemeProvider theme={theme}>     
      {profile_url ? <div>
        <FavoriteIcon onClick={handleFav} style={{color:'white',cursor: 'pointer', width:'60px', height:'30px', marginRight:'6px'}}/>
      
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={profile_url}  sx={{ width: 47, height: 47, marginRight:'26px'}}/></Button>
        <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 24,
            width: 20,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={handleProfile}> <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          Profile</MenuItem>
          <MenuItem onClick={handleSell}> <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          Sell on GatorMart </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
      <MenuItem onClick={handleCloseLogout}><ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>Logout</MenuItem>
    </Menu></div>
      : <div><a href="/login"><Button style={{backgroundColor: '#191919', color: 'white', width:'98px',height:'39px', marginTop:'3px', fontWeight: 'bold', marginRight:'19px', borderRadius:'19px'}}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#191919'; // Change text color to #191919 on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#191919';
        e.target.style.color = 'white'; // Change text color to #191919 on hover
      }}>Login</Button></a>
     </div>}
      </ThemeProvider>
        
          

</Navbar>
);

}

export default MYNavbar;