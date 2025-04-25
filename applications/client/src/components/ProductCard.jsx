import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Redeem as GiftIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./cardstyle.css";
function ProductCard(props) {
  const user_id = localStorage.getItem("user_id");
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.allFav && props.allFav.includes(props.Product._id)) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, [props.Product._id, props.allFav]);

  let renderImages = props.Product.img_url?.map((val, i) => {
    return (
      <Carousel.Item key={i} className="img-container">
        <Link to={`/product/${props.Product._id}`}>
          <img alt="product-pic" src={val} />
        </Link>
        {props.Product.isDonation && (
          <div className="gift-icon">
            <GiftIcon style={{ fontSize: "22px" }} />
          </div>
        )}
      </Carousel.Item>
    );
  });

  const handleFav = async (id) => {
    try {
      const addFav = await axios.post('http://localhost:4000/api/addFav',{productId:id,user_id:user_id} );
      if(addFav.data.status === 'success'){
        const updatedProductsArray = addFav.data.products;
        props.setAllFav(updatedProductsArray)
        localStorage.setItem('favoriteProducts', JSON.stringify(updatedProductsArray));
        setFav(true);
      } else {
      }
    } catch (error) {}
  };

  const removeFav=async(id)=>{
    try{
      const delFav=await axios.post('http://localhost:4000/api/deleteFav',{user_id:user_id,productId:id});
      if(delFav.data.status === 'success'){
        const updatedArray = delFav.data.products;
        props.setAllFav(updatedArray);
        localStorage.setItem('favoriteProducts', JSON.stringify(updatedArray));
        setFav(false);
      } else {
      }
    } catch (error) {}
  };

  const handleMessage = async (listedBy) => {
    try {
      if (user_id === null) {
        navigate("/login");
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/getChatRoomByParticipants",
          {
            userId1: user_id,
            userId2: listedBy,
          }
        );

        navigate(`/inbox/${response.data.data._id}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No chat room found. Creating a new one...");
        try {
          const createResponse = await axios.post(
            "http://localhost:4000/api/createChatRoom",
            { participants: [user_id, listedBy] }
          );
          navigate(`/inbox/${createResponse.data.data._id}`);
        } catch (error) {
          console.log("Unable to create chat room");
        }
      }
    }
  };

  return (
   
    <Card className="product-card" >
      <Link to={`/product/${props.Product._id}`}>
      <Carousel interval={null}>
      {renderImages}
     </Carousel></Link>
     <Card.Body>
       <Card.Title><h5 style={{fontSize: "17px",fontWeight:'bold'}}>{props.Product.product_name} </h5> </Card.Title>
     <h6>${`${props.Product.price}.00`} </h6>
     <Link to={`/product/${props.Product._id}`}>
      <Button  onClick={() => {
            handleMessage(props.Product.listedBy);
          }} variant="light" size='small'
      style={{ backgroundColor:"#232323",color:'white',width:'100px',height:'35px',fontSize:'13px', fontWeight:'bold'}}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'green';
        e.target.style.color = 'white'; 
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#232323';
        e.target.style.color = 'white'; 
      }}
      >Connect</Button></Link>
     {/* {props.Product.listedBy !== props.user && <Button variant="light" size='small'style={{ backgroundColor:"#2F2F2E",background:"#2F2F2E",color:'white'}}>Connect</Button>} 
   */}
  {user_id ? (
   <Button
      onClick={fav ? () => removeFav(props.Product._id) : () => handleFav(props.Product._id)}
      style={{
        backgroundColor: fav ? '#a31919' : '#232323',
        width:'7.2rem',
        height:'34px',
        marginLeft:'3px',
        fontSize:'12.8px',
        color: 'white',
        textTransform: 'none'
      }}
      onMouseEnter={(e) => {
        if (fav) {
          e.target.style.backgroundColor = '#8B0000'; // Darker red for Remove from Favorites
        } else {
          e.target.style.backgroundColor = '#4D4D4D'; // Light grey for Add to Favorites
        }
      }}
      onMouseLeave={(e) => {
        if (fav) {
          e.target.style.backgroundColor = '#a31919'; // Original red for Remove from Favorites
        } else {
          e.target.style.backgroundColor = '#232323'; // Original dark grey for Add to Favorites
        }
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

export default ProductCard;
