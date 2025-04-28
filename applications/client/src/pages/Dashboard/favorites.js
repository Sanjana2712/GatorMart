import React, { useEffect, useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Sidebar from '../../components/sidebar';
import Grid from '@mui/material/Unstable_Grid2';

function Favorites(props) {
  const user_id = props.user;
  const [myFavorites, setMyFavorites] = useState([]); 

  const getMyFav = useCallback(async () => {
    if (!user_id) {
        console.warn('User not logged in or user_id is missing.');
        return;
    }
    try {
        const response = await axios.post('http://localhost:4000/api/myFav', { user_id:user_id });
        setMyFavorites(response.data); // Update local state
    } catch (error) {
        console.log('Error fetching favorites:', error);
    }
}, [user_id]);

// Effect to fetch and set favorites
useEffect(() => {
    getMyFav(); // Fetch favorites on component mount or user change
}, [user_id, getMyFav]);

  const removeFav = async (id) => {
      const updatedFavorites = myFavorites.filter(product => product._id !== id);
      setMyFavorites(updatedFavorites);
      localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
      try {
        const delFav = await axios.post('http://localhost:4000/api/deleteFav', { user_id: user_id, productId: id });
        const updatedArray = delFav.data.products;
        localStorage.setItem('favoriteProducts', JSON.stringify(updatedArray));       
        if (delFav.data.status !== 'success') {
            // Optionally handle the failed deletion case
            console.error('Failed to delete favorite:', delFav.data.message);
            // restore the deleted item if the API call fails
            setMyFavorites([...updatedFavorites, myFavorites.find(product => product._id === id)]);
            localStorage.setItem('favoriteProducts', JSON.stringify(myFavorites));
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        // Restore the favorite item if there's an error
        setMyFavorites([...updatedFavorites, myFavorites.find(product => product._id === id)]);
        localStorage.setItem('favoriteProducts', JSON.stringify(myFavorites));
    }
  };


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
        <Grid key={Product._id} item xs={12} md={4} lg={3} style={{ marginBottom: '5px', marginRight: '3rem' }}>
          <Card key={Product._id} style={{
            width: '16.9rem',
            height: '18rem',
            border: 'rgb(220, 220, 220) solid 0.2px',
            marginBottom: '1rem'
          }}>
            <Link to={`/product/${Product._id}`}>
              <Carousel interval={null} >
                {renderImage(Product)}
              </Carousel>
            </Link>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Card.Title style={{ margin: 0 }}>
                  <h5 style={{ fontSize: "17px", margin: 0 , fontWeight:'bold' }}>{Product.product_name}</h5>
                </Card.Title>
                <Button 
                  onClick={() => { removeFav(Product._id); }} 
                  variant="light" 
                  size='small' 
                  style={{ color: 'darkred', cursor: 'pointer', background: 'none', border: 'none' }}>
                  <FavoriteIcon/>
                </Button>
              </div>
              <h6 style={{ margin: '1px 0 0', textAlign: 'left' }}>${Product.price}</h6>
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
        <Grid container spacing={3} style={{ paddingLeft: '4rem', paddingRight: '2rem', marginTop: '2.5rem' }}>
          {myFav}
        </Grid>
      </div>
    </div>
  )
}

export default Favorites;
