const mongoose = require('mongoose')
const User = require('./User');

const userFavorites = new mongoose.Schema({
       
  
  userID:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the 'Product' collection (defined in productModel)
    }
  ,
  products:[{type:String, required:true}],
       
      });

const model = mongoose.model('Favorites', userFavorites,'favorite-data')

module.exports = model