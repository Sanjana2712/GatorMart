import React,{useEffect,useState,useRef,useCallback}from 'react';
import Button from '@mui/material/Button';
import './productdetails.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ThumbnailDetails from '../../components/ThumbnailDetails';
import { color } from '@mui/system';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams, Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

function ProductInfo(props) {
  const [fav, setFav] = useState(false);
  const [favorites, setFavorites]= useState(sessionStorage.getItem('favoriteProducts'));
  const [author, setAuthor] = useState({name:'',
  profile_url:'', });
  const user_id = sessionStorage.getItem('user_id');
  const [index, setIndex] = useState(0); 
  const nextTab = index => {
  setIndex(index);
};
const { productId } = useParams();

useEffect(() => {
  if (favorites && favorites.includes(productId)) {
    setFav(true);
  } else {
    setFav(false);
  }
}, [productId, favorites]);

  const [item, setItem] = useState( { product_name:"",
    description: "", 
    product_type: "", 
   isDonation: "",
   isCampusPickup: "",
   pickup_addr: "",
   listedBy: "",
   isSold: "",
   img_url:[],
   price:""}
    );
 
  const handleFav= async(id)=>{
    try {
      const addFav = await axios.post('http://localhost:4000/api/addFav',{productId:id,userId:user_id} );
      if(addFav.data.status === 'success'){
       const updatedProductsArray = addFav.data.products;
       sessionStorage.setItem('favoriteProducts', JSON.stringify(updatedProductsArray));
       setFavorites(updatedProductsArray);
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
        setFavorites(updatedArray);
        sessionStorage.setItem('favoriteProducts', JSON.stringify(updatedArray));
        setFav(false);
    } else { }
  }catch(error) {
    }
  }


  const getProductData = async () =>{
    const productResponse = await axios.post('http://localhost:4000/api/product',{productId:productId});
    setItem(productResponse.data)
    if(props.user !== null){
      if(props.user === productResponse.data.listedBy){
        const name = sessionStorage.getItem('fullname');
        const profile_url = sessionStorage.getItem('profile_url');
        setAuthor((prev)=>{
          return {...prev, name ,profile_url};
        });
        
      }else{
        const userResponse = await axios.post('http://localhost:4000/api/userinfo',{userId:productResponse.data.listedBy});
        setAuthor(userResponse.data);
       
      }
    } else{const userResponse = await axios.post('http://localhost:4000/api/userinfo',{userId:productResponse.data.listedBy});
    setAuthor(userResponse.data);
    }
   
  }
  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    getProductData();
    
    
  },[]);
  return (
    <div className="app">
    <div className="breadcrumb-container">
      <Link to="/" className="breadcrumb-link">
        Home
      </Link>
      <span className="breadcrumb-separator"> > </span>
      <p className="breadcrumb-product-name">{item.product_name}</p>
    </div>
    <div className="breadcrumb-line"></div>
    <div className="details" key={item._id}>
      <div className="big-img">
        <img src={item.img_url[index]} alt="" />
      </div>
      <div className="box">
        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginRight: '20px', flex: '1' }}>
            {item.product_name}
          </h1>
         
        </div>
        <p><b>Price: </b> ${item.price}.00</p>
        <p>{item.description}</p>
        <p><b>Pickup Address: </b>{item.pickup_addr}</p>
        <div style={{ marginBottom: '10px' }}>
          <ThumbnailDetails images={item.img_url} tab={nextTab} />
          {item.isDonation && <Chip label="Donation" size='small' style={{ marginRight: '6px', marginTop: '6px' }} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  {props.user !== item.listedBy && (
    <Button
      onClick={fav ? () => removeFav(productId) : () => handleFav(productId)}
      style={{
        backgroundColor: fav ? '#a31919' : '#232323',
        width: '48%',
        height: '42px',
        marginTop: fav ? '25px' : '25px',
        color: 'white',
        textTransform: 'none'
      }}
      variant="contained"
    >
      {fav ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  )}

  {props.user !== item.listedBy && (
    <Button
      style={{
        backgroundColor: '#232323',
        width: '48%',
        height: '42px',
        marginTop: '25px',
        color: 'white',
        textTransform: 'none'
      }}
      variant="contained"
    >
      Buy now
    </Button>
  )}
</div>

      </div>
    </div>
  </div>
  
  )
}


export default ProductInfo;