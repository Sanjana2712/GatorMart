const express = require('express');
const app = express();
const cors = require ('cors');
const mongoose = require ('mongoose');
require('dotenv/config');
app.use(cors({origin: true, credentials: true}));
const bodyParser = require('body-parser');


// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Connect to MongoDB
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to MongoDB');

    app.use("/",require("./Controllers/productsController"));
    app.use("/",require("./Controllers/userController.js"));
    app.use("/",require("./Controllers/favoritesController.js"));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(process.env.PORT || 4000, ()=>{
    console.log('Listening on port 4000');
    
})
})
.catch((err)=>{
console.log(err);
});

//Production Build things 
// if(process.env.NODE_ENV === 'production'){

//     app.use(express.static(path.join(__dirname, 'client/build')));

//     app.get('*',function(req,res){
//         res.sendFile(path.join(__dirname, 'client/build',routesHandler));
//     });
// }
// remember to install the pm2 module for running the node application outside of the terminal
//requring the routes
 
