import React from "react";
import { useEffect, useState, useCallback } from "react";
import "./Home.css";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import ProductCard from "../../components/ProductCard";
import Grid from "@mui/material/Unstable_Grid2";
const drawerWidth = 240;
const navItems = [
  "Electronics",
  "Clothing",
  "Kitchen",
  "Furniture",
  "Pets",
  "Sports",
  "Fitness",
  "Automobiles",
  "Healthcare",
  "Donation",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),

    width: "17rem",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Home(props) {
  const [searchItem, setSearchItem] = useState("");
  const [allProducts, setAllProducts] = useState(null);
  const [allFavID, setAllFavID] = useState(null);
  const [category, setCategory] = useState("All");
  const { window } = props;
  const user_id = sessionStorage.getItem("user_id");
  const searchInput = React.useRef(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const updateCategories = (item) => {
    setCategory(item);
    setSearchItem("");
  };
  const handleChangeSearch = (e) => {
    console.log(e.target.value);
    setSearchItem(e.target.value);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CATEGORY
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => updateCategories(item)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getAllFav = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/getFavID", {
        user_id: user_id,
      });

      sessionStorage.setItem(
        "favoriteProducts",
        JSON.stringify(response.data.products)
      );
      setAllFavID(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }, [props.user]);

  useEffect(() => {
    getAllFav();
  }, [getAllFav]);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/allproducts",
        { category: category, user: props.user }
      );
      setAllProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [category, props.user]);

  useEffect(() => {
    getAllProducts();
  }, [category, getAllProducts]);

  let productCards = allProducts?.map((Product, i) => {
    if (Product.product_name.toLowerCase().includes(searchItem.toLowerCase())) {
      return (
        <Grid key={i} item xs={24} sm={12} md={8} lg={6} xl={4}>
          <ProductCard
            Product={Product}
            user={props.user}
            allFav={allFavID}
            setAllFav={setAllFavID}
          />
        </Grid>
      );
      /* </Col> */
    } else {
      return <></>;
    }
  });
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <AppBar key="search" position="static">
        <Toolbar className="search">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginLeft: "45px" }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                onClick={() => updateCategories(item)}
                sx={{
                  color: "#2f2f2e",
                  fontSize: "12.8px",
                  fontWeight: "bold",
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Search style={{ marginLeft: "80px", backgroundColor: "#F1F4F4" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              key="search"
              name="Search"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchItem}
              onChange={(e) => handleChangeSearch(e)}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Grid
        style={{ paddingLeft: "4.6rem", paddingRight: "2rem" }}
        direction="row"
        sx={{ mt: 4, mb: 4 }}
        alignItems="center"
        container
        rowSpacing={5}
        columnSpacing={2}
        columns={30}
      >
        {productCards}
      </Grid>
    </div>
  );
}
