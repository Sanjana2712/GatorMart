import React, { useEffect, useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar';
import Grid from '@mui/material/Unstable_Grid2';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Favorites() {
  const [open, setOpen] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(true);
  const user_id = sessionStorage.getItem("user_id");
  const [myFavorites, setMyFavorites] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const removeFav = async (id) => {
    try {
      const delFav = await axios.post('http://localhost:4000/api/deleteFav', { user_id: user_id, productId: id });
      console.log("I'm in the delete api");
      if (delFav.data.status === 'success') {
        const updatedArray = delFav.data.products;
        console.log(updatedArray);
        setMyFavorites(updatedArray);
        sessionStorage.setItem('favoriteProducts', JSON.stringify(updatedArray));
        setTriggerFetch(prevState => !prevState);
      } else { }
    } catch (error) {
      console.log(error);
    }
  }

  const getMyFav = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/myFav', { user_id: user_id });
      setMyFavorites(response.data);
      console.log("my fav are", myFavorites);
    } catch (error) {
      console.log(error);
    }
  }, [triggerFetch, user_id]);

  useEffect(() => {
    getMyFav();
  }, [triggerFetch, user_id]);

  const renderImage = (Product) => {
    return Product.img_url?.map((val, i) => {
      return (
        <Carousel.Item key={i} style={{ position: 'relative', width: '100%', height: '12rem', overflow: 'hidden' }}>
          <img alt='product-pic'
            style={{ height: '100%', width: '100%', position: 'relative', objectFit: 'cover' }}
            src={val}
          />
        </Carousel.Item>
      )
    });
  }

  const myFav = myFavorites?.map((Product, i) => {
    if (Product._id) {
      return (
        <Grid key={Product._id} item xs={12} md={4} lg={3} style={{ marginBottom: '5px', marginRight: '4rem' }}>
          <Card key={Product._id} style={{
            width: '16.9rem',
            height: '19.8rem',
            border: 'rgb(220, 220, 220) solid 0.2px',
            marginBottom: '2rem'
          }}>
            <Link to={`/product/${Product._id}`}>
              <Carousel interval={null} >
                {renderImage(Product)}
              </Carousel>
            </Link>
            <Card.Body>
              <Card.Title><h5 style={{ fontSize: "17px" }}>{Product.product_name} </h5> </Card.Title>
              <h6>Price: ${Product.price}</h6>
              <Button onClick={() => { removeFav(Product._id); }} variant="light" size='small' style={{ backgroundColor: "#3A3A39", color: 'white', width: '100px', fontSize: '13px' }}>Delete</Button>
            </Card.Body>
          </Card>
        </Grid>
      )
    }
    return null;
  })

  return (
    <div className="my-items-container">
      <Sidebar />
      <div className="content-container">
        <Typography variant="h6" sx={{ my: 0, paddingLeft: '4rem', fontWeight: 'bold' }}>
          Favorites
        </Typography>
        <Grid container spacing={3} style={{ paddingLeft: '4rem', paddingRight: '2rem', marginTop: '2rem' }}>
          {myFav}
        </Grid>
      </div>
    </div>
  )
}

export default Favorites;
