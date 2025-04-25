import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import List from "@mui/material/List";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const drawerWidth = 280;

const Sidebar = () => {
  const location = useLocation();

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '12px 16px',
    marginBottom: '8px',
    borderRight: '4px solid transparent', // Default transparent border
  };

  const linkStyle = {
    color: 'black',
    fontSize: '1.1rem',
    textDecoration: 'none',
  };

  const getBorderColor = (path) =>
    location.pathname === path ? '#1976D2' : 'transparent';

  return (
    <Box sx={{ display: "flex" }}>
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
              fontWeight: 'bold',
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
                style={{
                  ...listItemStyle,
                  borderRight: `4px solid ${getBorderColor('/profile')}`,
                }}
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

            <Link to="/inbox/default" style={linkStyle}>
              <ListItem
                key="Inbox"
                selected={location.pathname === '/inbox/default'}
                style={{
                  ...listItemStyle,
                  borderRight: `4px solid ${getBorderColor('/')}`,
                }}
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
                style={{
                  ...listItemStyle,
                  borderRight: `4px solid ${getBorderColor('/MyItems')}`,
                }}
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
                style={{
                  ...listItemStyle,
                  borderRight: `4px solid ${getBorderColor('/favorites')}`,
                }}
              >
                <FavoriteBorderIcon />
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
                style={{
                  ...listItemStyle,
                  borderRight: `4px solid ${getBorderColor('/addproducts')}`,
                }}
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