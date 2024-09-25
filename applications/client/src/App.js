import React ,{useState}from "react";
import Navbar from "./components/navbar2";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Verify from "./pages/Login/Verify";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Dashboard/profile"
import Favorites from "./pages/Dashboard/favorites"
import AddProducts from "./pages/AddProducts/AddProducts";
import ProductInfo from "./pages/ProductInfo/products";
import MyItems from "./pages/MyProducts/MyItems";
import Footer from "./components/footer";

function App() {
  const [user, setUser]= useState(localStorage.getItem('user_id'));

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route index element={<Home user={user} />} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path='/favorites' element={<Favorites user={user}/>} />
       <Route path="/addproducts" element={<AddProducts user={user} />} />
        <Route path="/product/:productId" element={<ProductInfo user={user}/>} />
        <Route path="/MyItems" element={<MyItems user={user}/>} />   
        <Route path="/api/verify/:userId/:verificationToken" element={<Verify/>}/>
      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;
