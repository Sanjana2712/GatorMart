import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Chip from '@mui/material/Chip';
import { useEffect, useState, useCallback} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Redeem as GiftIcon } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './cardstyle.css';
function ProductCard(props) {
  
  const user_id = sessionStorage.getItem('user_id');
  const [fav, setFav] = useState(false);  //to display favorited/unfavorited status
  
  useEffect(() => {
    if (props.allFav && props.allFav.includes(props.Product._id)) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, [props.Product._id, props.allFav]);
  
  let renderImages = props.Product.img_url?.map((val,i) =>{
   return  (
      <Carousel.Item key={i} className="img-container">
         <img alt='product-pic'
          src={val}
        />
          {props.Product.isDonation && (
            <div className="gift-icon">
              <GiftIcon  style={{ fontSize: '22px' }} />
            </div>
          )}
        
      </Carousel.Item>
    )});

  const handleFav= async(id)=>{
    try {
      
      const addFav = await axios.post('http://localhost:4000/api/addFav',{productId:id,userId:user_id} );
      if(addFav.data.status === 'success'){
        const updatedProductsArray = addFav.data.products;
        props.setAllFav(updatedProductsArray)
        sessionStorage.setItem('favoriteProducts', JSON.stringify(updatedProductsArray));
        setFav(true);
      }else{
      } 
  } catch (error) {
    }
  }

  const removeFav=async(id)=>{
    try{
      const delFav=await axios.post('http://localhost:4000/api/deleteFav',{user_id:user_id,productId:id});
      console.log("I'm in the delete api");
      if(delFav.data.status === 'success'){
        const updatedArray = delFav.data.products;
        props.setAllFav(updatedArray);
        sessionStorage.setItem('favoriteProducts', JSON.stringify(updatedArray));
        setFav(false);
    } else { }
  }catch(error) {
    }
  }

  const renderCampusPickupChip = () => {
  
    if (props.Product.isCampusPickup === true){
    return <Chip label="On Campus" size='small' color="success"style={{background:'#76eab6',marginRight:'6px',marginTop:'6px'}} />};
   
 }

  return (
   
    <Card className="product-card" >
      <Link to={`/product/${props.Product._id}`}>
      <Carousel interval={null}>
      {renderImages}
     </Carousel></Link>
     <Card.Body>
       <Card.Title><h5 style={{fontSize: "17px"}}>{props.Product.product_name} </h5> </Card.Title>
     <h6>${`${props.Product.price}.00`} </h6>
     <Link to={`/product/${props.Product._id}`}>
      <Button  variant="light" size='small'style={{ backgroundColor:"#3A3A39",color:'white',width:'100px',height:'35px',fontSize:'13px'}}>Buy Now</Button></Link>
     {/* {props.Product.listedBy !== props.user && <Button variant="light" size='small'style={{ backgroundColor:"#2F2F2E",background:"#2F2F2E",color:'white'}}>Connect</Button>} 
   */}
  {user_id ? (
   <Button
      onClick={fav ? () => removeFav(props.Product._id) : () => handleFav(props.Product._id)}
      style={{
        backgroundColor: fav ? '#a31919' : '#3A3A39',
        width:'7.2rem',
        height:'34px',
        marginLeft:'3px',
        fontSize:'12.8px',
        color: 'white',
        textTransform: 'none'
      }}
      variant="contained"
    >
      {fav ? 'Unsave' : 'Add to Favorites'}
    </Button>
) : <></>}

     </Card.Body>
  </Card>
  )
}

export default ProductCard