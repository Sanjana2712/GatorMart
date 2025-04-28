const Favorites = require('../models/userFavorites.js');
const express = require('express');
const router = express.Router();
const fs = require('fs')
const util = require('util')
require('dotenv/config');
router.post('/api/addFav', async (req, res) => {
    try {
        const productID = req.body.productId;
        const userID=req.body.user_id;
        let favoritesEntry = await Favorites.findOne({ userID });
        if (!favoritesEntry) {
          favoritesEntry = new Favorites({ userID, products: [productID] });
          await favoritesEntry.save();
        } else {
          if (!favoritesEntry.products.includes(productID)) {
            favoritesEntry.products.push(productID);
            await favoritesEntry.save();
          } else {   
            return res.status(200).json({ status: 'info', message: 'Product already in favorites' });
          }
        }
        return res.status(200).json({ status: 'success', message: 'Product added to favorites', products: favoritesEntry.products });
       
      } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
      }
    });
    router.post('/api/deleteFav', async (req, res) => {
      try {
        const productID = req.body.productId;
        const userID=req.body.user_id; 
        // Find the Favorites document by user_id and update it to remove productID
        const favorites = await Favorites.findOne({userID:userID});
        if (!favorites) {
          return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        // Find the index of the productID in the products array
        const index = favorites.products.indexOf(productID);
        if (index !== -1) {
          favorites.products.splice(index, 1);
          // Save the updated Favorites document
          const updatedFavorites = await favorites.save();
          return res.status(200).json({ status: 'success', message: 'Product deleted successfully', products: updatedFavorites.products });
        } else {
          return res.status(404).json({ status: 'error', message: 'Product not found in favorites' });
        }
      } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
    });
    

    module.exports = router;
