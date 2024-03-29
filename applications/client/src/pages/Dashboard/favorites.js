import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Sidebar from '../../components/sidebar';
import Grid from '@mui/material/Unstable_Grid2';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import '../MyProducts/myitems.css';
import {Link} from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Favorites() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType]= useState("");
  const user_id= sessionStorage.getItem("user_id");
  const [myFavorites, setMyFavorites] = useState(null);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const displaySnackBar = (messageType, message) => {
    setMessageType(messageType);
    setMessage(message);
    setOpen(true);
 };
 const removeFav=async(id)=>{
  try{
    const delFav=await axios.post('http://localhost:4000/api/deleteFav',{user_id:user_id,productId:id});
    console.log("I'm in the delete api");
    if(delFav.data.status === 'success'){
      const updatedArray = delFav.data.products;
      setMyFavorites(updatedArray);
      sessionStorage.setItem('favoriteProducts', JSON.stringify(updatedArray));
  } else { }
}catch(error) {
  }
}
  const getMyFav = useCallback(async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/myFav', {user_id:user_id});
      setMyFavorites(response.data);
      console.log(myFavorites);
  } catch (error) {
      console.log(error);
   }},[myFavorites,user_id]);
   
   useEffect(()=> {
    getMyFav();
  },[getMyFav]);

const renderImage = (Product) => {
    return Product.img_url?.map((val,i) =>{
      return  (
         <Carousel.Item key={i}>
           <img alt='product-pic'
            style={{height: '180px', width:'210px', float: "left"}}
             src={val}
           />
         </Carousel.Item>
       )});
  }
// Inside the map function where you're rendering the product cards
const myFav = myFavorites?.map((Product, i) => {
  if (Product._id) {
    return (
      <div className='myprod' key={Product._id}>
        <div
          className='myprodcard'
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '400px', // Fixed maximum width
            padding: '0.5rem',
            borderRadius: '8px',
            margin: '0.5rem', // Add margin for spacing between cards
            display: 'flex', // Make items inline
          }}
        >
          <Carousel interval={null} style={{ height: '200px', width: '200px', marginRight: '1rem' }}>
            {renderImage(Product)}
          </Carousel>
         <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
  <h6 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>{Product.product_name}</h6>
  <h6 style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Price: ${Product.price}</h6>
  <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>{Product.description}</p>
  <h6 style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>Category: {Product.product_type}</h6>
  <p style={{ fontSize: '0.8rem', margin: '0.5rem 0', marginBottom: '0.5rem' }}><b>Pickup address:</b> {Product.pickup_addr}</p>
 
  <DeleteIcon onClick={() => { removeFav(Product._id); }} style={{color:'black',marginLeft:'500px',fontSize:'1.6rem',cursor:'pointer'}}/>
   
</div>

        </div>
      </div>
    )
  }
  return <React.Fragment key={Product._id} />;
})

  

return(
  
    <div className="my-items-container">
      <Sidebar />

      <div className="content-container">
      <Typography variant="h6" sx={{ my: 1,paddingLeft: '3rem',padding:'1rem', borderBottom: '0.5px solid #ccc',fontWeight:'semi-bold'}}>
       Favorites 
      </Typography>
        <Grid
          direction="row"
          sx={{ mt: 4, mb: 4 }}
          container
          rowSpacing={3}
          columnSpacing={2}
          columns={24}
        >
          {myFav}
        </Grid>
       
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Favorites
