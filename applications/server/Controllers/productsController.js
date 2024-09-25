const express = require('express');
const router = express.Router();
const Favorites=require('../models/userFavorites');
const Product = require('../models/products');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
require('dotenv/config');

const { uploadFile, getFileStream } = require('../s3');

// Middleware to parse JSON data

router.post('/api/allproducts', async (req, res) => {
try{
   if(req.body.category=='All'){
    const Products = await Product.find({isSold:false,listedBy:{$nin:[req.body.user]}});
    return res.send(Products);
   }
   if(req.body.category=='Donation'){
    const Products = await Product.find({isSold:false, isDonation:true,listedBy:{$nin:[req.body.user]}});
    return res.send(Products);
   }
   else{
    const Products = await Product.find({isSold:false, product_type:req.body.category,listedBy:{$nin:[req.body.user]}});
    return res.send(Products);
   }
    }
    catch(err){
       return res.status(500).send(err);
        console.log(err);
    }

});

router.post('/api/getFavID', async (req, res) => {
    try {
        const userID = req.body.user_id;
        let favorites = await Favorites.findOne({ userID:userID });
        return res.status(200).json({ status: 'success', products: favorites.products });
        
      } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
      }
    });

    router.post('/api/myFav', async (req, res) => {
        try {
            const userID = req.body.user_id;
            const favorites = await Favorites.findOne({ userID:userID });
            if (!favorites) {
                return res.status(404).send('No favorites found for the user');
            }
            // Assuming `favorites.productIds` contains the IDs of favorite products
            const favoriteProductIds = favorites.products;
            const products = await Product.find({ _id: { $in: favoriteProductIds } });
            if (!products) {
                return res.status(404).send('No favorite products found');
            }
            res.send(products);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
    

router.post('/api/myproducts', async (req, res) => {
    try{   
        const Products = await Product.find({listedBy:req.body.user_id});
        res.send(Products);}
        catch(err){
            res.status(500).send(err);
            console.log(err);   
        }    
    });

    router.post('/api/product', async (req, res) => {
        try{
            const ProductInfo = await Product.findById(req.body.productId);
            res.send(ProductInfo);}
            catch(err){
                res.status(500).send(err);
                console.log(err);
            }
        });

    router.post('/api/marksold', async (req, res) => {
        try{
            const updateResult = await Product.findByIdAndUpdate(req.body.productId, {isSold:true});
            if(updateResult === null){
            return res.status(200).json({status:'warning', message:'Could not find this product' });
            }
            return res.status(200).json({status:'success', message:'Product properties updated successfully'  });
        }
            catch(err){
                console.log('reached here 5')
               return res.status(500).send("Unexpected Error Occured");
            }
        });

router.post('/api/deleteproduct', async (req, res) => {
            try{
                const deleteResult = await Product.findByIdAndDelete(req.body.productId);
               
                if(deleteResult === null){
                return res.status(200).json({status:'warning', message:'Could not find this product' });
                }
                return res.status(200).json({status:'success', message:'Product deleted successfully'  });
            }
                catch(err){
                    console.log('reached here 5')
                   return res.status(500).send("Unexpected Error Occured");
                }
            });

router.post('/api/addproduct',  upload.array('image',4),async(req,res)=> {
 try{
    const files = req.files;
    console.log(req.body);
    const imageKeys =[];

for ( const file of files){
    const result = await uploadFile(file);
    console.log(result);
    imageKeys.push(result.Location);
    await unlinkFile(file.path);
}
    let newProduct = new Product();
    newProduct.product_name=req.body.product_name;
    newProduct.description= req.body.description;
    newProduct.product_type= req.body.product_type;
    newProduct.isDonation = (req.body.isDonation==='true');
    newProduct.isSold = false;
    newProduct.isCampusPickup=(req.body.isCampusPickup==='true');
    newProduct.pickup_addr=req.body.pickup_addr;
    newProduct.listedBy= req.body.listedBy;
    newProduct.price= Number(req.body.price);
    newProduct.img_url= imageKeys;
    console.log(req.body);
    console.log(imageKeys);
    let saveProduct = await newProduct.save();
     return res.status(200).json({status:'success', message:'Product added successfully'  });
}
    catch(err){
        
        return res.status(500).send('Unexpected Error occurred');
    }
    
});

module.exports = router;
// res.status(500).send("Unexpected Error Occured");
// res.status(200).json({status:'error', message:'Email already registered'  });
