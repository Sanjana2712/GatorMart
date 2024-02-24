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

  
  const myFav = myFavorites?.map((Product,i) => {
    if (Product._id){
      return (<div className='myprod'key={Product._id}>
      <div className='myprodcard'  style={{justifyContent: 'center', alignItems:'center'}}>
      <Carousel interval={null} style={{minHeight: '220px', maxHeight:'250px', maxWidth:'210px', float: "left", padding:"1rem 1rem 0rem"}}>
  {renderImage(Product)}
  </Carousel>
       <h5>{Product.product_name}</h5>
       <h6>Price: ${Product.price}</h6>
         <p>{Product.description}</p>
        <h6>Category: {Product.product_type}</h6>
       <p><b>Pickup address:</b> {Product.pickup_addr}</p>
       <DeleteIcon onClick={() => { removeFav(Product._id); }} style={{color:'black',marginLeft:'750px',fontSize:'2rem', marginTop:'0.8rem',cursor:'pointer'}}/>
       <Link to={`/product/${Product._id}`}>
        
      <Button className='responsiveButtons'variant="contained" style={{float:"right",backgroundColor:"black",background:"black",color:'white',marginRight:'10px',paddingTop:'0.3rem',fontSize:'1.1rem'}}>View</Button></Link>
        </div>
     </div>)
    } 
    return < React.Fragment key ={Product._id}/>;
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