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
import {Link} from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyItems() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType]= useState("");
  const user_id= sessionStorage.getItem("user_id");
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
            style={{height: '180px', width:'210px', float: "left"}}
             src={val}
           />
         </Carousel.Item>
       )});
  }

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
  
  

  const currentListed = allProducts?.map((Product,i) => {
    if (Product.isSold === false){
      return (<div className='myprod'key={Product._id}>
      <div className='myprodcard'  style={{justifyContent: 'center', alignItems:'center'}}>
      <Carousel interval={null} style={{minHeight: '270px', maxHeight:'270px', maxWidth:'210px', float: "left", padding:"1rem 1rem 0rem"}}>
  {renderImage(Product)}
  </Carousel>
       <h5>{Product.product_name}</h5>
       <h6>Price: ${Product.price}</h6>
         <p>{Product.description}</p>
      
      
       <h6>Category: {Product.product_type}</h6>
       <p><b>Pickup address:</b> {Product.pickup_addr}</p>
       <Link to={`/product/${Product._id}`}>
      <Button className='responsiveButtons'variant="contained" style={{float:"right",backgroundColor:"black",background:"black",color:'white',marginRight:'10px',paddingTop:'0.3rem',fontSize:'1.1rem'}}>View</Button></Link>
       <Button onClick ={()=>{handleDelete(Product._id);}} className='responsiveButtons'variant="contained" style={{float:"right",backgroundColor:'black',color:'white'}}>Delete <DeleteIcon/></Button>
      <Button onClick ={()=>{handleSold(Product._id);}}className='responsiveButtons1'variant="contained" style={{float:"right",backgroundColor:'green',color:'white',marginRight:'0.5rem'}}>Sold <CheckCircleIcon/> </Button>
      </div>
     </div>)
    } 
    return < React.Fragment key ={Product._id}/>;
 })

 const soldProduct = allProducts?.map((Product,i) => {
  if (Product.isSold === true){
    return  (<div className='myprod'key={Product._id}>
    <div className='myprodcard'  style={{justifyContent: 'left', alignItems:'left'}}>
    <Carousel interval={null} style={{minHeight: '220px', maxHeight:'250px', maxWidth:'210px', float: "left", padding:"1rem 1rem 0rem"}}>
{renderImage(Product)}
</Carousel>
     <h5>{Product.product_name}</h5>
     <h6>Price: ${Product.price}</h6>
       <p>{Product.description}</p>
    
    
     <h6>Category: {Product.product_type}</h6>
     <p><b>Pickup address:</b> {Product.pickup_addr}</p>
     <Link to={`/product/${Product._id}`}>
      <Button className='responsiveButtons'size='big' variant="contained" style={{ float:"right",backgroundColor:"black",borderColor: "white",background:"black",color:'white',marginRight:'10px'}}>View</Button></Link>
     <Button onClick ={()=>{handleDelete(Product._id);}} className='responsiveButtons'variant="contained" style={{float:"right",backgroundColor:'black',color:'white'}}>Delete <DeleteIcon/></Button>
    
    </div>
   </div>)
  }
  return <React.Fragment key ={Product._id}/>;
})


return(
  
    <div className="my-items-container">
      <Sidebar />

      <div className="content-container">
      <Typography variant="h6" sx={{ my: 1,padding:'1rem', borderBottom: '0.5px solid #ccc',fontWeight:'semi-bold'}}>
       Currently Listed
      </Typography>
        <Grid
          direction="row"
          sx={{ mt: 4, mb: 4 }}
          container
          rowSpacing={3}
          columnSpacing={2}
          columns={24}
        >
          {currentListed}
        </Grid>

        <Typography variant="h6" sx={{ my: 1,paddingLeft: '3rem',padding:'1rem', borderBottom: '0.5px solid #ccc',fontWeight:'semi-bold'}}>
       Sold 
      </Typography>
        <Grid
          direction="row"
          sx={{ mt: 4, mb: 4 }}
          container
          rowSpacing={3}
          columnSpacing={2}
          columns={24}
        >
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
