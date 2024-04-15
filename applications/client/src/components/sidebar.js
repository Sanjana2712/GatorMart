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
const drawerWidth = 280;

const Sidebar = () => {
  const location = useLocation();
  const listItemStyle = {
    display: "flex",
    alignItems: "center",

    textDecoration: "none",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "black", // Font color
    fontSize: "1.1rem", // Font size
    textDecoration: "none", // Remove underline from link
    "&:hover": {
      backgroundColor: "blue", // MUI default hover color
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          borderRight: "0.5px solid #ccc",
          backgroundColor: "white",
        }}
        aria-label="mailbox folders"
      >
        <div>
          <Typography
            variant="h6"
            sx={{
              my: 1,
              paddingLeft: "3rem",
              padding: "1rem",
              borderBottom: "0.5px solid #ccc",
            }}
          >
            Dashboard
          </Typography>
          <List>
            <Link to="/profile" style={linkStyle}>
              <ListItem
                key="Account"
                selected={location.pathname === "/profile"}
                style={listItemStyle}
              >
                <AccountCircleIcon />
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "black", marginLeft: "12px" }}
                >
                  Account
                </Typography>
              </ListItem>{" "}
            </Link>

            <ListItem key="Inbox" selected={location.pathname === "/inbox"}>
              <ChatIcon />
              <ListItemButton component={Link} to="/inbox">
                <ListItemText
                  primary="Inbox"
                  primaryTypographyProps={{ fontSize: "16px" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              key="Listings"
              selected={location.pathname === "/MyItems"}
            >
              <FormatListBulletedOutlinedIcon />
              <ListItemButton component={Link} to="/MyItems">
                <ListItemText
                  primary="Listings"
                  primaryTypographyProps={{ fontSize: "16px" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              key="Favorites"
              selected={location.pathname === "/favorites"}
            >
              <DescriptionIcon />
              <ListItemButton component={Link} to="/favorites">
                <ListItemText
                  primary="Favorites"
                  primaryTypographyProps={{ fontSize: "16px" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              key="Add Products"
              selected={location.pathname === "/addproducts"}
            >
              <StorefrontOutlinedIcon />
              <ListItemButton component={Link} to="/addproducts">
                <ListItemText
                  primary="Sell"
                  primaryTypographyProps={{ fontSize: "16px" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </div>
      </Box>
    </Box>
  );
};

export default Sidebar;
