import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Sidebar from '../../components/sidebar';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './myitems.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Link} from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyItems() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType]= useState("");
  const user_id= localStorage.getItem("user_id");
  const [allProducts, setAllProducts] = useState(null);
  const [toggle, setToggle] =useState(false);
  
  
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
  
 const handleSold= async(id)=>{
  try {
    const soldResult = await axios.post('http://localhost:4000/api/marksold',{productId:id});
    if(soldResult.data.status === 'success'){
      displaySnackBar(soldResult.data.status, soldResult.data.message);
      setToggle((prevToggle)=>{
        return !prevToggle;
      });

    }else{
      displaySnackBar(soldResult.data.status, soldResult.data.message);
    }
} catch (error) {
  displaySnackBar('error',error.response.data);
 }  
}

const handleAvail= async(id)=>{
  try {
    const listResult = await axios.post('http://localhost:4000/api/markavail',{productId:id});
    if(listResult.data.status === 'success'){
      displaySnackBar(listResult.data.status, listResult.data.message);
      setToggle((prevToggle)=>{
        return !prevToggle;
      });

    }else{
      displaySnackBar(listResult.data.status, listResult.data.message);
    }
} catch (error) {
  displaySnackBar('error',error.response.data);
 }  
}

const handleDelete= async(id)=>{
try {
  const deleteResult = await axios.post('http://localhost:4000/api/deleteproduct',{productId:id});
  if(deleteResult.data.status === 'success' || deleteResult.data.status === 'warning' ){
    displaySnackBar(deleteResult.data.status, deleteResult.data.message);
    setToggle((prevToggle)=>{
      return !prevToggle;
    });
  }else{
    displaySnackBar(deleteResult.data.status, deleteResult.data.message);
  }
} catch (error) {
displaySnackBar('error',error.response.data);
}
}

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/myproducts',{user_id:user_id});
      setAllProducts(response.data);
  } catch (error) {
      console.log(error);
   }},[setAllProducts,user_id]);
   
   useEffect(()=> {
    getAllProducts();
  },[toggle,getAllProducts]);

const renderImage = (Product) => {
    return Product.img_url?.map((val,i) =>{
      return  (
         <Carousel.Item key={i}>
           <img alt='product-pic'
            style={{height: '160px', width:'190px', float: "left"}}
             src={val}
           />
         </Carousel.Item>
       )});
  }

  
  const currentListed = allProducts?.map((Product, i) => {
    if (!Product.isSold) {
      return (
        <div className='myprod' key={Product._id}>
          <div className='myprodcard'>
          <Carousel interval={null} style={{ float: "left", marginRight:'2.6%'}}>          
          {renderImage(Product)}
            </Carousel>
            <h5><b>{Product.product_name}</b></h5>
            <h6>${Product.price}</h6>
            <Typography variant="body2" sx={{ color: '#757575' }}>Available.</Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}> 
            Category: {Product.product_type} | Pickup: {Product.pickup_addr}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px'}}>
            <div style={{ display: 'flex', gap: '8px' }}>

            <Button onClick={() => { handleSold(Product._id); }}
            className='responsiveButtons'
            variant="contained"
            style={{
              backgroundColor: "#fdbbb3",fontWeight:'bold',
              color: '#a5252c',fontSize:'0.98rem',padding:'3px 12px 4px 12px' 
            }}> Mark as Sold </Button>

              <Link to={`/product/${Product._id}`}><Button
                    className='responsiveButtons'
                    variant="contained"
                    style={{
                      backgroundColor: "#d3d4d5",fontWeight:'bold',
                      color: 'black',fontSize:'0.98rem',padding:'3px 12px 4px 12px' 
                    }} > Preview </Button> </Link>
              
                <Button
                  onClick={() => { handleDelete(Product._id); }}
                  className='responsiveButtons'
                  variant="contained"
                  style={{ backgroundColor: '#d3d4d5', color: 'black', fontWeight:'bold', fontSize:'0.98rem',padding:'3px 12px 4px 12px' }}
                > Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return <React.Fragment key={Product._id} />;
  });
  
  const soldProduct = allProducts?.map((Product, i) => {
    if (Product.isSold) {
      return (
        <div className='myprod' key={Product._id}>
          <div className='myprodcard'>
            <Carousel interval={null} style={{ float: "left", marginRight:'2.6%'}}>
              {renderImage(Product)}
            </Carousel>
            <h5><b>{Product.product_name}</b></h5>
            <h6>${Product.price}</h6>
            <Typography variant="body2" sx={{ color: '#757575' }}>Sold.</Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
      Category: {Product.product_type} | Pickup: {Product.pickup_addr}</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>         
              <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={() => { handleAvail(Product._id); }}
                    className='responsiveButtons'
                    variant="contained"
                    style={{
                      backgroundColor: "#bee3f9",fontWeight:'bold',
                      color: '#0f7abc',fontSize:'0.98rem',padding:'3px 12px 4px 12px' 
                    }}
                  >
                    Relist this Item
                  </Button>
                <Link to={`/product/${Product._id}`}>
                  <Button
                    className='responsiveButtons'
                    variant="contained"
                    style={{
                      backgroundColor: "#d3d4d5",fontWeight:'bold',
                      color: 'black',fontSize:'0.98rem',padding:'3px 12px 4px 12px' 
                    }}
                  >
                    Preview 
                  </Button>
                </Link>
                <Button
                  onClick={() => { handleDelete(Product._id); }}
                  className='responsiveButtons'
                  variant="contained"
                  style={{ backgroundColor: '#d3d4d5', color: 'black', fontWeight:'bold', fontSize:'0.98rem',padding:'3px 12px 4px 12px'   }}
                > Delete 
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <React.Fragment key={Product._id} />;
  });

return(
    <div className="my-items-container">
      <Sidebar />
      <div className="content-container">
        <Grid
          direction="row"
          sx={{ mt: 4, mb: 4 }}
          container
          rowSpacing={3}
          columnSpacing={2}
          columns={24}
        >
          {currentListed}
          {soldProduct}
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

export default MyItems
