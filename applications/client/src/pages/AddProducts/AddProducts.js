import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useState } from "react";
import Sidebar from '../../components/sidebar';
import * as React from "react"
import './Add.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddProducts = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType]= useState("");
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  let [value, setValue] = useState('');
  const [donation, setDonation] = useState(false);
  const [author, setAuthor] = useState('Clothing');
  const [pickup, setPickup] = useState(true);
  const [pickupAddr, setPickupAddr] = useState("");
  
  const displaySnackBar = (messageType, message) => {
    setMessageType(messageType);
    setMessage(message);
    setOpen(true);
  }
  const initialProducts = {  
    slider_images: [] // (array of strings)   
    };
    
    const [products, setProducts] = useState(initialProducts);

    //price
  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setValue(result);
  };

  if (value !== '') {
    const num = Number(value);
  }//price is a number

  const ValidateName = event => {
    var letters = /^[a-zA-Z0-9~@!;"*()_+=|\\,.?: -]*$/;
    if((event.target.value.match(letters)) && event.target.value.length<=25){
      setTitle(event.target.value);
    }
  };
 const ValidateDescr = event => {
  var letter = /^[a-zA-Z0-9~@!;"#$^*()_+=[\]{}|\\,.?: -]*$/;
  if((event.target.value.match(letter))){
    setBody(event.target.value);
  }
 }
 const ValidatePickupAddr = (e) =>{
  var letter = /^[a-zA-Z0-9~@!;"#$^*()_+=[\]{}|\\,.?: -]*$/;
  if((e.target.value.match(letter)) && e.target.value.length<=280){
    setPickupAddr(e.target.value);}
 }
  const handleSliderImages = (e) => {

    if (e.target.files) {
    setProducts({ ...products, slider_images: [...e.target.files] });
    }
    console.log("Update slider images", products);
  };//multiple image uploads
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }setOpen(false);}
  const handleSubmit = async (e) => {
   
 
  try{ e.preventDefault()
    if(products.slider_images.length !== 0 ){
      console.log(products.slider_images);
     
      const formData = new FormData();
      products.slider_images.forEach((file)=>{
        formData.append('image',file)
      })
    

      formData.append('product_name',title);
      formData.append('description',body);
      formData.append('product_type',author);
      formData.append('isDonation',donation);
      formData.append('isCampusPickup',pickup);
      formData.append('price',value);
      formData.append('pickup_addr',pickupAddr);
      formData.append('listedBy',localStorage.getItem('user_id'));
      const result = await axios.post('http://localhost:4000/api/addproduct',formData,{headers:{'Content-Type':'multipart/form-data'}});
      if(result.data.status === 'success'){
        displaySnackBar(result.data.status,result.data.message);
      }
     
      
    }else {
      displaySnackBar('error','Invalid entries');

    }}catch(err){
      displaySnackBar('error',err.response.data);
    }
    
    
  }
  return (
     <div style={{ display: 'flex'}}> <Sidebar/><div className="create" style={{ flexGrow: 1, paddingTop:'2rem' }}>
     
     <form onSubmit={handleSubmit}style={{padding: "17px"}}>
  
       <label>Product Name:</label>
       <input 
         type="text" 
         required 
         value={title}
         onChange={ValidateName}
       />
       <label>Description:</label>
       <textarea
         required
         value={body}
         onChange={ValidateDescr}
       ></textarea>
       <label>Price($) :</label>
       { donation ? <input type='text' value={value=0} name="Price" disabled></input> :  <input 
         type="text" 
         id="Price"
         name="Price"
         required 
         value={value}
         onChange={handleChange}
       />
}

       <label>Category:</label>
       <select
         value={author}
         required
         onChange={(e) => setAuthor(e.target.value)}
       >
         <option value="Clothing">Clothing</option>
         <option value="Kitchen">Kitchen</option>
         <option value="Furniture">Furniture</option>
         <option value="Electronics">Electronics</option>
         <option value="Sports">Sports/Outdoors</option>
         <option value="Fitness">Fitness</option>
         <option value="Automobiles">Automobiles</option>
         <option value="Pets">Pets</option>
         <option value="Healthcare">Healthcare</option>
        
         
       </select>

       <label>Donation:</label>
     
       <select  onChange={(e) => {if (e.target.value=="Yes"){setDonation(true);} else {setDonation(false)}}}>
         <option value="No">No</option>
         <option value="Yes">Yes</option>
         
       </select>

       <label>Upload product images:</label>
       <input
multiple
type="file"
accept="image/*, png, jpeg, jpg"
id="slider_images"
name="slider_images"
onChange={handleSliderImages}
/>  
   
       <label>Pick-up preference:</label>
       <select
         onChange={(e)=> {if(e.target.value=="On-campus"){setPickup(true);} else {setPickup(false)}}}
       >
         <option name = "On-campus" value="On-campus">Oncampus</option>
         <option name = "Off-campus"value="Off-campus">Off-campus</option>
       </select>
       <label>Pickup Address</label>
       <textarea
         required
         value={pickupAddr}
         onChange={ValidatePickupAddr}
       ></textarea>
       <button type="submit">Submit</button>
     </form>
    
   </div> <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}anchorOrigin={{ vertical:'bottom', horizontal:'center' }}>
        <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar></div>
  );
}
 
export default AddProducts;