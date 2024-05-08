import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import List from '@mui/material/List';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ChatIcon from '@mui/icons-material/ChatOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

const drawerWidth = 280;

const Sidebar = () => {
  const location = useLocation();
  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '8px', // Add margin bottom between list items
  };

  const linkStyle = {
    color: 'black',
    fontSize: '1.1rem',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'blue',
    },
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          borderRight: '0.5px solid #ccc',
          backgroundColor: 'white',
        }}
        aria-label="mailbox folders"
      >
        <div>
          
          <Typography
            variant="h6"
            sx={{
              my: 1,
              padding: '1rem',
              borderBottom: '0.5px solid #ccc',
            }}
          >
            Dashboard
          </Typography>
          <List>
            <Link to="/profile" style={linkStyle}>
              <ListItem
                key="Account"
                selected={location.pathname === '/profile'}
                style={listItemStyle}
              >
                <AccountCircleIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    color: 'black',
                    marginLeft: '12px',
                  }}
                >
                  Account
                </Typography>
              </ListItem>
            </Link>

            <Link to="/profile" style={linkStyle}>
              <ListItem
                key="Inbox"
                selected={location.pathname === '/'}
                style={listItemStyle}
              >
                <ChatIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    color: 'black',
                    marginLeft: '12px',
                  }}
                >
                  Inbox
                </Typography>
              </ListItem>
            </Link>
            <Link to="/MyItems" style={linkStyle}>
              <ListItem
                key="Listings"
                selected={location.pathname === '/MyItems'}
                style={listItemStyle}
              >
                <FormatListBulletedOutlinedIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    color: 'black',
                    marginLeft: '12px',
                  }}
                >
                  Listings
                </Typography>
              </ListItem>
            </Link>

            <Link to="/favorites" style={linkStyle}>
              <ListItem
                key="Favorites"
                selected={location.pathname === '/favorites'}
                style={listItemStyle}
              >
                <DescriptionIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    color: 'black',
                    marginLeft: '12px',
                  }}
                >
                  Favorites
                </Typography>
              </ListItem>
            </Link>

            <Link to="/addproducts" style={linkStyle}>
              <ListItem
                key="Add Products"
                selected={location.pathname === '/addproducts'}
                style={listItemStyle}
              >
                <StorefrontOutlinedIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    color: 'black',
                    marginLeft: '12px',
                  }}
                >
                  Sell
                </Typography>
              </ListItem>
            </Link>
          </List>
          <Divider />
        </div>
      </Box>
    </Box>
  );
};

export default Sidebar;
