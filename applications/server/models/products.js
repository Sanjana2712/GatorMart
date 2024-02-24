const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const {ObjectId} = mongoose.Schema; 

const productSchema= new Schema({
    product_name:{type:String,required:true},
    description: {type:String, required:true}, 
    product_type: {type:String, enum:["Electronics","Furniture","Clothing","Kitchen","Sports", "Fitness","Automobiles","Pets","Healthcare","Other"], required:true}, 
   isDonation: {type:Boolean, required:true},
   isCampusPickup: {type:Boolean, required:true},
   pickup_addr: {type:String},
   listedBy: {type:mongoose.Types.ObjectId,ref:'User', required:true},
   isSold: {type:Boolean, required:true},
   img_url:[{type:String}],
   price:{type:Number, required:true},
   
    
    },{
        versionKey: false 
    });
    
    module.exports = mongoose.model('Product', productSchema,'product_table');